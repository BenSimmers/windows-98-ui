import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Taskbar } from '.';
import { MenuItem } from '../menu';
import { WindowManagerProvider } from '@/hooks/WindowManagerProvider';
import { useWindow } from '@/hooks/windowManager';

function Pane({ name }: { name: string }) {
  const win = useWindow({ id: name });
  return <div data-testid={name} {...win.windowProps} style={win.windowProps.style} />;
}

const renderDesktop = (props: Parameters<typeof Taskbar>[0] = {}) =>
  render(
    <WindowManagerProvider>
      <Pane name="Notepad" />
      <Pane name="Paint" />
      <Taskbar {...props} />
    </WindowManagerProvider>,
  );

describe('Taskbar', () => {
  it('shows a button per open window', () => {
    renderDesktop();
    expect(screen.getByRole('button', { name: 'Notepad' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Paint' })).toBeInTheDocument();
  });

  it('marks the focused window active', () => {
    renderDesktop();
    // Paint registered last, so it starts focused.
    expect(screen.getByRole('button', { name: 'Paint' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Notepad' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('focuses a window when its button is clicked', async () => {
    const user = userEvent.setup();
    renderDesktop();

    await user.click(screen.getByRole('button', { name: 'Notepad' }));

    expect(screen.getByRole('button', { name: 'Notepad' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('Notepad')).toHaveStyle({ zIndex: '1001' });
  });

  it('restores a minimised window from its button', async () => {
    const user = userEvent.setup();

    function Minimiser() {
      const win = useWindow({ id: 'Notepad' });
      return (
        <>
          <div data-testid="Notepad" {...win.windowProps} style={win.windowProps.style} />
          <button type="button" onClick={win.minimize}>
            minimise
          </button>
        </>
      );
    }

    render(
      <WindowManagerProvider>
        <Minimiser />
        <Taskbar />
      </WindowManagerProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'minimise' }));
    expect(screen.getByTestId('Notepad')).not.toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Notepad' }));
    expect(screen.getByTestId('Notepad')).toBeVisible();
  });

  it('drops the button once a window closes', async () => {
    const user = userEvent.setup();

    function Closer() {
      const win = useWindow({ id: 'Notepad' });
      return (
        <button type="button" onClick={win.close}>
          close it
        </button>
      );
    }

    render(
      <WindowManagerProvider>
        <Closer />
        <Taskbar />
      </WindowManagerProvider>,
    );

    expect(screen.getByRole('button', { name: 'Notepad' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'close it' }));
    expect(screen.queryByRole('button', { name: 'Notepad' })).not.toBeInTheDocument();
  });

  it('relabels windows through getWindowLabel', () => {
    renderDesktop({ getWindowLabel: (id) => `${id} - [Untitled]` });
    expect(screen.getByRole('button', { name: 'Notepad - [Untitled]' })).toBeInTheDocument();
  });

  it('renders tray content', () => {
    renderDesktop({ tray: '12:00 PM' });
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });
});

describe('Taskbar start menu', () => {
  const withStart = () =>
    renderDesktop({
      startMenu: (
        <>
          <MenuItem label="Programs" />
          <MenuItem label="Shut Down..." />
        </>
      ),
    });

  it('toggles the start menu', async () => {
    const user = userEvent.setup();
    withStart();

    const start = screen.getByRole('button', { name: 'Start' });
    expect(start).toHaveAttribute('aria-expanded', 'false');

    await user.click(start);
    expect(start).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'Programs' })).toBeVisible();
  });

  // Regression: the outside-dismiss handler and the toggle both fired, so the
  // menu closed and immediately reopened within one click.
  it('closes again when Start is clicked a second time', async () => {
    const user = userEvent.setup();
    withStart();

    const start = screen.getByRole('button', { name: 'Start' });
    await user.click(start);
    await user.click(start);

    expect(start).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when a start menu command is chosen', async () => {
    const user = userEvent.setup();
    withStart();

    await user.click(screen.getByRole('button', { name: 'Start' }));
    await user.click(screen.getByRole('menuitem', { name: 'Programs' }));

    expect(screen.getByRole('button', { name: 'Start' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('hides the Start button when no menu is supplied', () => {
    renderDesktop();
    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
  });

  it('works outside a WindowManagerProvider when window buttons are off', () => {
    expect(() => render(<Taskbar showWindows={false} tray="12:00 PM" />)).not.toThrow();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });
});
