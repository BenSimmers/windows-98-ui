import * as React from 'react';
import { useStableId } from '@/utils/useStableId';
import { useIsomorphicLayoutEffect } from '@/utils/useIsomorphicLayoutEffect';
import { useWindowManagerStore } from './windowManagerContext';
import { UNREGISTERED, type WindowManagerSnapshot, type WindowRecord } from './windowManagerStore';

export type { WindowRecord, WindowManagerSnapshot };

/**
 * The whole desktop's state, plus the actions to drive it. Use this to build
 * a taskbar, a window menu, or anything that needs to see every window.
 */
export function useWindowManager() {
  const store = useWindowManagerStore('useWindowManager');
  const snapshot = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  return React.useMemo(
    () => ({
      /** Bottom to top. */
      order: snapshot.order,
      windows: snapshot.order.map((id) => snapshot.windows[id]),
      focusedId: snapshot.focusedId,
      focus: store.focus,
      open: store.open,
      close: store.close,
      minimize: store.minimize,
      restore: store.restore,
      toggleMaximize: store.toggleMaximize,
    }),
    [snapshot, store],
  );
}

export type UseWindowOptions = {
  /** Optional — one is generated when omitted. */
  id?: string;
  /** Raise and focus the window when a pointer goes down anywhere inside it. */
  focusOnPointerDown?: boolean;
};

export type UseWindowResult = WindowRecord & {
  focus: () => void;
  close: () => void;
  minimize: () => void;
  restore: () => void;
  toggleMaximize: () => void;
  /** Spread onto the window element: stacking, focus handling, `hidden`. */
  windowProps: {
    id: string;
    style: React.CSSProperties;
    onPointerDownCapture?: (event: React.PointerEvent) => void;
    hidden?: boolean;
  };
  /** Spread onto a `<TitleBar>` to wire its three buttons. */
  titleBarProps: {
    inactive: boolean;
    onMinimize: () => void;
    onMaximize: () => void;
    onClose: () => void;
  };
};

/**
 * Registers one window with the manager and returns its live state plus the
 * props to wire it up.
 *
 * @example
 * const win = useWindow({ id: 'my-computer' });
 * const drag = useDraggable({ bounds: 'parent' });
 *
 * <Window ref={drag.ref} {...win.windowProps} style={{ ...drag.style, ...win.windowProps.style }}>
 *   <TitleBar title="My Computer" minimize maximize close
 *             {...win.titleBarProps} {...drag.dragHandleProps} />
 * </Window>
 */
export function useWindow(options: UseWindowOptions = {}): UseWindowResult {
  const { focusOnPointerDown = true } = options;
  const store = useWindowManagerStore('useWindow');
  const id = useStableId(options.id);

  useIsomorphicLayoutEffect(() => {
    store.register(id);
    return () => store.unregister(id);
  }, [store, id]);

  const getRecord = React.useCallback(() => store.getSnapshot().windows[id] ?? UNREGISTERED, [store, id]);
  const record = React.useSyncExternalStore(store.subscribe, getRecord, getRecord);

  return React.useMemo(() => {
    const focus = () => store.focus(id);

    return {
      ...record,
      id,
      focus,
      close: () => store.close(id),
      minimize: () => store.minimize(id),
      restore: () => store.restore(id),
      toggleMaximize: () => store.toggleMaximize(id),
      windowProps: {
        id,
        style: { zIndex: record.zIndex },
        onPointerDownCapture: focusOnPointerDown ? focus : undefined,
        hidden: !record.isOpen || record.isMinimized || undefined,
      },
      titleBarProps: {
        inactive: !record.isFocused,
        onMinimize: () => store.minimize(id),
        onMaximize: () => store.toggleMaximize(id),
        onClose: () => store.close(id),
      },
    };
  }, [record, store, id, focusOnPointerDown]);
}
