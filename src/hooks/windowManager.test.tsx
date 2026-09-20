import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WindowManagerProvider } from './WindowManagerProvider';
import { useWindow, useWindowManager } from './windowManager';

function Pane({ name }: { name: string }) {
  const win = useWindow({ id: name });
  return (
    <div data-testid={name} {...win.windowProps} style={win.windowProps.style}>
      <span data-testid={`${name}-focused`}>{String(win.isFocused)}</span>
      <button onClick={win.minimize}>minimise {name}</button>
      <button onClick={win.close}>close {name}</button>
    </div>
  );
}

function Taskbar() {
  const { windows, focusedId } = useWindowManager();
  return (
    <ul data-testid="taskbar">
      {windows.map((win) => (
        <li key={win.id}>
          {win.id}
          {win.id === focusedId ? ' *' : ''}
        </li>
      ))}
    </ul>
  );
}

const renderDesktop = () =>
  render(
    <WindowManagerProvider>
      <Pane name="alpha" />
      <Pane name="beta" />
      <Taskbar />
    </WindowManagerProvider>,
  );

describe('useWindow', () => {
  it('assigns ascending z-indexes and focuses the last registered window', () => {
    renderDesktop();

    expect(screen.getByTestId('alpha')).toHaveStyle({ zIndex: '1000' });
    expect(screen.getByTestId('beta')).toHaveStyle({ zIndex: '1001' });
    expect(screen.getByTestId('beta-focused')).toHaveTextContent('true');
    expect(screen.getByTestId('alpha-focused')).toHaveTextContent('false');
  });

  it('raises a window when a pointer goes down inside it', async () => {
    const user = userEvent.setup();
    renderDesktop();

    await user.pointer({ target: screen.getByTestId('alpha'), keys: '[MouseLeft]' });

    expect(screen.getByTestId('alpha')).toHaveStyle({ zIndex: '1001' });
    expect(screen.getByTestId('alpha-focused')).toHaveTextContent('true');
    expect(screen.getByTestId('beta-focused')).toHaveTextContent('false');
  });

  it('hides a window once minimised and again once closed', async () => {
    const user = userEvent.setup();
    renderDesktop();

    await user.click(screen.getByRole('button', { name: 'minimise alpha' }));
    expect(screen.getByTestId('alpha')).not.toBeVisible();

    await user.click(screen.getByRole('button', { name: 'close beta' }));
    expect(screen.getByTestId('beta')).not.toBeVisible();
  });

  it('generates an id when none is given', () => {
    function Anonymous() {
      const win = useWindow();
      return <div data-testid="anon" {...win.windowProps} />;
    }
    render(
      <WindowManagerProvider>
        <Anonymous />
      </WindowManagerProvider>,
    );

    expect(screen.getByTestId('anon').id).toBeTruthy();
  });

  it('unregisters on unmount so the remaining windows compact', () => {
    const { rerender } = render(
      <WindowManagerProvider>
        <Pane name="alpha" />
        <Pane name="beta" />
        <Taskbar />
      </WindowManagerProvider>,
    );
    expect(screen.getByTestId('taskbar')).toHaveTextContent('alpha');

    rerender(
      <WindowManagerProvider>
        <Pane name="beta" />
        <Taskbar />
      </WindowManagerProvider>,
    );

    expect(screen.getByTestId('taskbar')).not.toHaveTextContent('alpha');
    expect(screen.getByTestId('beta')).toHaveStyle({ zIndex: '1000' });
  });

  it('throws a useful error when used outside the provider', () => {
    function Orphan() {
      useWindow();
      return null;
    }
    // React logs the thrown error itself; the expectation below is the assertion.
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      expect(() => render(<Orphan />)).toThrow(/must be used inside a <WindowManagerProvider>/);
    } finally {
      consoleError.mockRestore();
    }
  });
});
