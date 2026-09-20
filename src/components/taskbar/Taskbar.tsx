import * as React from 'react';
import { Menu } from '@/components/menu';
import { useWindowManager } from '@/hooks/windowManager';

export type TaskbarProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Contents of the Start menu. Omit to hide the Start button. */
  startMenu?: React.ReactNode;
  startLabel?: string;
  /** Right-hand tray content, typically a clock. */
  tray?: React.ReactNode;
  /**
   * Render a button per window. Requires a `<WindowManagerProvider>`; set
   * this to false to use the taskbar as a plain strip.
   */
  showWindows?: boolean;
  /** Label for a window whose id is not human-readable. */
  getWindowLabel?: (id: string) => string;
  children?: React.ReactNode;
};

/**
 * The Windows 98 taskbar: a Start button, one button per open window, and a
 * tray. Window buttons come from the nearest `<WindowManagerProvider>`, so
 * clicking one focuses or restores that window.
 */
export const Taskbar = React.forwardRef<HTMLDivElement, TaskbarProps>(
  (
    { startMenu, startLabel = 'Start', tray, showWindows = true, getWindowLabel, className, children, ...props },
    ref,
  ) => {
    const [startOpen, setStartOpen] = React.useState(false);
    const startBoundaryRef = React.useRef<HTMLDivElement | null>(null);

    return (
      <div ref={ref} className={`taskbar${className ? ` ${className}` : ''}`} {...props}>
        {startMenu && (
          <div ref={startBoundaryRef} style={{ position: 'relative' }}>
            <button
              type="button"
              className="taskbar-start"
              aria-haspopup="menu"
              aria-expanded={startOpen}
              onClick={() => setStartOpen((open) => !open)}
            >
              {startLabel}
            </button>
            <Menu
              open={startOpen}
              onClose={() => setStartOpen(false)}
              boundaryRef={startBoundaryRef}
              aria-label={startLabel}
              className="start-menu"
              anchorStyle={{ position: 'absolute', bottom: '100%', left: 0 }}
              onClick={() => setStartOpen(false)}
            >
              <li aria-hidden="true" className="start-menu-banner">
                Windows 98
              </li>
              <ul className="start-menu-items" role="none">
                {startMenu}
              </ul>
            </Menu>
          </div>
        )}

        {showWindows ? <TaskbarWindows getWindowLabel={getWindowLabel} /> : null}
        {children}
        {tray && <div className="taskbar-tray">{tray}</div>}
      </div>
    );
  },
);
Taskbar.displayName = 'Taskbar';

/**
 * Split out so `Taskbar` can be used without a `<WindowManagerProvider>` —
 * the hook only runs when window buttons are actually asked for.
 */
function TaskbarWindows({ getWindowLabel }: { getWindowLabel?: (id: string) => string }) {
  const { windows, focusedId, focus, restore } = useWindowManager();

  return (
    <div className="taskbar-items">
      {windows
        .filter((win) => win.isOpen)
        .map((win) => {
          const active = win.id === focusedId && !win.isMinimized;
          return (
            <button
              key={win.id}
              type="button"
              className={`taskbar-button${active ? ' active' : ''}`}
              aria-pressed={active}
              onClick={() => (win.isMinimized ? restore(win.id) : focus(win.id))}
            >
              {getWindowLabel ? getWindowLabel(win.id) : win.id}
            </button>
          );
        })}
    </div>
  );
}
