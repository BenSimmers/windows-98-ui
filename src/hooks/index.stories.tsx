import type { Meta, StoryObj } from '@storybook/react-vite';
import { Window } from '@/components/window/windowContainer';
import { WindowBody } from '@/components/window/windowBody';
import { TitleBar } from '@/components/titleBar';
import { Taskbar } from '@/components/taskbar';
import { MenuItem, MenuSeparator } from '@/components/menu';
import { WindowManagerProvider, useWindow, useDraggable, type Position } from '.';

type PaneProps = {
  title: string;
  initialPosition: Position;
  children: React.ReactNode;
};

/** A window assembled entirely from the headless hooks plus the base components. */
function Pane({ title, initialPosition, children }: PaneProps) {
  const win = useWindow();
  const drag = useDraggable<HTMLDivElement>({ bounds: 'parent', initialPosition });

  return (
    <Window ref={drag.ref} width={280} {...win.windowProps} style={{ ...drag.style, ...win.windowProps.style }}>
      <TitleBar title={title} minimize maximize close {...win.titleBarProps} {...drag.dragHandleProps} />
      <WindowBody>{children}</WindowBody>
    </Window>
  );
}

function DesktopDemo() {
  return (
    <WindowManagerProvider>
      <div style={{ position: 'relative', height: '100vh', background: '#008080', overflow: 'hidden' }}>
        <Pane title="My Computer" initialPosition={{ x: 40, y: 40 }}>
          Drag the title bar. Click any window to raise it.
        </Pane>
        <Pane title="Recycle Bin" initialPosition={{ x: 160, y: 140 }}>
          Minimise me, then bring me back from the taskbar.
        </Pane>
        <Pane title="Notepad" initialPosition={{ x: 280, y: 240 }}>
          Stacking, focus and minimise state all live in the manager.
        </Pane>
        <Taskbar
          tray="12:00 PM"
          startMenu={
            <>
              <MenuItem label="Programs" />
              <MenuItem label="Documents" />
              <MenuItem label="Settings" />
              <MenuSeparator />
              <MenuItem label="Shut Down..." />
            </>
          }
        />
      </div>
    </WindowManagerProvider>
  );
}

const meta: Meta<typeof DesktopDemo> = {
  title: 'Hooks/Window Manager',
  component: DesktopDemo,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const DraggableDesktop: StoryObj<typeof DesktopDemo> = {};
