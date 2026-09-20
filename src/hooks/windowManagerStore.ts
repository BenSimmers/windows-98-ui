export type WindowRecord = {
  id: string;
  zIndex: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
};

export type WindowManagerSnapshot = {
  /** Bottom to top. The last entry is the topmost window. */
  order: readonly string[];
  windows: Readonly<Record<string, WindowRecord>>;
  focusedId: string | null;
};

export type WindowManagerStore = ReturnType<typeof createWindowManagerStore>;

export const DEFAULT_BASE_Z_INDEX = 1000;

const EMPTY: WindowManagerSnapshot = { order: [], windows: {}, focusedId: null };

/** Stable placeholder for a window that has not registered yet. */
export const UNREGISTERED: WindowRecord = {
  id: '',
  zIndex: DEFAULT_BASE_Z_INDEX,
  isOpen: true,
  isMinimized: false,
  isMaximized: false,
  isFocused: false,
};

export function createWindowManagerStore(baseZIndex: number = DEFAULT_BASE_Z_INDEX) {
  let state: WindowManagerSnapshot = EMPTY;
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((listener) => listener());

  const reconcile = (order: readonly string[], patches: Record<string, Partial<WindowRecord>> = {}) => {
    const focusedId = order.length ? order[order.length - 1] : null;
    const windows: Record<string, WindowRecord> = {};
    let changed = order.length !== state.order.length;

    order.forEach((id, index) => {
      const previous = state.windows[id];
      const next: WindowRecord = {
        ...UNREGISTERED,
        ...previous,
        ...patches[id],
        id,
        zIndex: baseZIndex + index,
        isFocused: id === focusedId,
      };

      if (
        previous &&
        previous.zIndex === next.zIndex &&
        previous.isFocused === next.isFocused &&
        previous.isOpen === next.isOpen &&
        previous.isMinimized === next.isMinimized &&
        previous.isMaximized === next.isMaximized
      ) {
        windows[id] = previous;
      } else {
        windows[id] = next;
        changed = true;
      }

      if (state.order[index] !== id) changed = true;
    });

    if (!changed && focusedId === state.focusedId) return;

    state = { order, windows, focusedId };
    emit();
  };

  const raise = (id: string) => {
    if (!state.windows[id]) return;
    if (state.order[state.order.length - 1] === id) return;
    reconcile([...state.order.filter((other) => other !== id), id]);
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    getSnapshot: () => state,

    register(id: string) {
      if (state.windows[id]) return;
      reconcile([...state.order, id]);
    },

    unregister(id: string) {
      if (!state.windows[id]) return;
      reconcile(state.order.filter((other) => other !== id));
    },

    focus: raise,

    open(id: string) {
      reconcile(state.windows[id] ? [...state.order.filter((o) => o !== id), id] : [...state.order, id], {
        [id]: { isOpen: true, isMinimized: false },
      });
    },

    close(id: string) {
      if (!state.windows[id]) return;
      reconcile(state.order, { [id]: { isOpen: false, isFocused: false } });
    },

    minimize(id: string) {
      if (!state.windows[id]) return;
      reconcile(state.order, { [id]: { isMinimized: true } });
    },

    restore(id: string) {
      if (!state.windows[id]) return;
      reconcile([...state.order.filter((o) => o !== id), id], { [id]: { isMinimized: false, isMaximized: false } });
    },

    toggleMaximize(id: string) {
      const current = state.windows[id];
      if (!current) return;
      reconcile([...state.order.filter((o) => o !== id), id], { [id]: { isMaximized: !current.isMaximized } });
    },
  };
}
