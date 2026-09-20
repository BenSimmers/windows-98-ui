import * as React from 'react';
import { useStableId } from '@/utils/useStableId';
import { supportsPopover } from '@/utils/supportsPopover';

export type MenuItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: string;
  /** Right-aligned accelerator text, e.g. "Ctrl+S". */
  shortcut?: string;
  children?: React.ReactNode;
};

/** A single command inside a `<Menu>`. */
export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ label, shortcut, className, ...props }, ref) => (
    <li role="none">
      <button
        ref={ref}
        type="button"
        role="menuitem"
        className={`menu-item${className ? ` ${className}` : ''}`}
        {...props}
      >
        <span>{label}</span>
        {shortcut && <span className="menu-item-shortcut">{shortcut}</span>}
      </button>
    </li>
  ),
);
MenuItem.displayName = 'MenuItem';

export const MenuSeparator = () => <li role="separator" className="menu-separator" />;
MenuSeparator.displayName = 'MenuSeparator';

export type MenuProps = Omit<React.HTMLAttributes<HTMLUListElement>, 'onToggle'> & {
  open?: boolean;
  onClose?: () => void;
  /** Applied when the Popover API is unavailable and the menu is positioned manually. */
  anchorStyle?: React.CSSProperties;
  /**
   * Element that also counts as "inside" for dismissal — normally the wrapper
   * holding both the trigger and this menu. Without it, clicking the trigger
   * to close would dismiss and re-open in the same gesture.
   */
  boundaryRef?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
};

/**
 * A menu surface. Uses the Popover API for top-layer rendering and
 * light-dismiss when the browser supports it, and falls back to an absolutely
 * positioned list with its own outside-click and Escape handling when not.
 */
export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  ({ open = false, onClose, anchorStyle, boundaryRef, className, children, style, ...props }, forwardedRef) => {
    const ref = React.useRef<HTMLUListElement | null>(null);
    const [native] = React.useState(supportsPopover);

    const setRef = React.useCallback(
      (node: HTMLUListElement | null) => {
        ref.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    React.useEffect(() => {
      const node = ref.current;
      if (!node || !native) return;

      try {
        if (open) node.showPopover();
        else node.hidePopover();
      } catch {
        // Already in the requested state; the spec throws rather than no-oping.
      }
    }, [open, native]);

    // Light dismiss. The Popover API gives us this for free, so only the
    // fallback path needs listeners.
    React.useEffect(() => {
      if (native || !open || !onClose) return;

      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        const boundary = boundaryRef?.current;
        const inside = ref.current?.contains(target) || boundary?.contains(target);
        if (!inside) onClose();
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };

      document.addEventListener('pointerdown', onPointerDown, true);
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('pointerdown', onPointerDown, true);
        document.removeEventListener('keydown', onKeyDown);
      };
    }, [native, open, onClose, boundaryRef]);

    const popoverProps = native
      ? ({ popover: 'auto', onToggle: (event: React.SyntheticEvent<HTMLUListElement>) => {
          // Covers light dismiss, which closes the popover without our knowing.
          if ((event.nativeEvent as ToggleEvent).newState === 'closed' && open) onClose?.();
        } } as React.HTMLAttributes<HTMLUListElement>)
      : {};

    return (
      <ul
        ref={setRef}
        role="menu"
        className={`menu${className ? ` ${className}` : ''}`}
        hidden={!native && !open}
        style={{ ...(native ? undefined : anchorStyle), ...style }}
        {...popoverProps}
        {...props}
      >
        {children}
      </ul>
    );
  },
);
Menu.displayName = 'Menu';

export type MenuBarProps = React.HTMLAttributes<HTMLDivElement>;

/** Horizontal strip of menu titles, as along the top of a window. */
export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} role="menubar" className={`menu-bar${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </div>
));
MenuBar.displayName = 'MenuBar';

export type MenuBarItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: string;
  /** Menu contents; rendered into a `<Menu>` anchored beneath the title. */
  children?: React.ReactNode;
};

/**
 * A menu title plus the menu it opens. Manages its own open state and closes
 * once a command inside it is chosen.
 */
export const MenuBarItem = React.forwardRef<HTMLButtonElement, MenuBarItemProps>(
  ({ label, children, className, onClick, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const menuId = useStableId();
    const boundaryRef = React.useRef<HTMLDivElement | null>(null);

    return (
      <div ref={boundaryRef} style={{ position: 'relative' }}>
        <button
          ref={ref}
          type="button"
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          className={`menu-bar-item${className ? ` ${className}` : ''}`}
          onClick={(event) => {
            setOpen((wasOpen) => !wasOpen);
            onClick?.(event);
          }}
          {...props}
        >
          {label}
        </button>
        <Menu
          id={menuId}
          open={open}
          onClose={() => setOpen(false)}
          boundaryRef={boundaryRef}
          aria-label={label}
          anchorStyle={{ position: 'absolute', left: 0, top: '100%' }}
          onClick={() => setOpen(false)}
        >
          {children}
        </Menu>
      </div>
    );
  },
);
MenuBarItem.displayName = 'MenuBarItem';
