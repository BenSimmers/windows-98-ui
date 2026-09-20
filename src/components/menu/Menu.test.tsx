import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu, MenuBar, MenuBarItem, MenuItem, MenuSeparator } from '.';

/** jsdom has no Popover API; install a minimal one to exercise that path. */
function installPopover() {
  const proto = HTMLElement.prototype as unknown as Record<string, unknown>;
  const calls = { show: 0, hide: 0 };

  proto.showPopover = function (this: HTMLElement) {
    calls.show += 1;
    this.removeAttribute('hidden');
  };
  proto.hidePopover = function (this: HTMLElement) {
    calls.hide += 1;
  };

  return {
    calls,
    restore() {
      delete proto.showPopover;
      delete proto.hidePopover;
    },
  };
}

afterEach(() => {
  const proto = HTMLElement.prototype as unknown as Record<string, unknown>;
  delete proto.showPopover;
  delete proto.hidePopover;
});

describe('Menu (fallback path, no Popover API)', () => {
  it('is hidden until opened', () => {
    const { rerender } = render(
      <Menu aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );
    expect(screen.getByRole('menu', { hidden: true })).not.toBeVisible();

    rerender(
      <Menu open aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );
    expect(screen.getByRole('menu')).toBeVisible();
  });

  it('closes on an outside pointer down', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <div>
        <button type="button">outside</button>
        <Menu open onClose={onClose} aria-label="File">
          <MenuItem label="Open" />
        </Menu>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('stays open when the pointer goes down inside', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Menu open onClose={onClose} aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );

    await user.click(screen.getByRole('menuitem', { name: 'Open' }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Menu open onClose={onClose} aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('detaches its listeners once closed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <Menu open onClose={onClose} aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );
    rerender(
      <Menu onClose={onClose} aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );

    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('Menu (native Popover path)', () => {
  it('drives the popover imperatively instead of using hidden', () => {
    const popover = installPopover();

    const { rerender } = render(
      <Menu aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );
    rerender(
      <Menu open aria-label="File">
        <MenuItem label="Open" />
      </Menu>,
    );

    expect(popover.calls.show).toBe(1);
    // jsdom's UA stylesheet hides `[popover]` that is not `:popover-open`, a
    // state it cannot enter, so the node is present but not in the a11y tree.
    expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute('popover', 'auto');
    popover.restore();
  });
});

describe('MenuItem', () => {
  it('renders a label and an optional shortcut', () => {
    render(
      <Menu open aria-label="File">
        <MenuItem label="Save" shortcut="Ctrl+S" />
        <MenuSeparator />
        <MenuItem label="Exit" />
      </Menu>,
    );

    const save = screen.getByRole('menuitem', { name: /Save/ });
    expect(save).toHaveTextContent('Save');
    expect(save).toHaveTextContent('Ctrl+S');
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('can be disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Menu open aria-label="File">
        <MenuItem label="Print" disabled onClick={onClick} />
      </Menu>,
    );

    await user.click(screen.getByRole('menuitem', { name: 'Print' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('MenuBarItem', () => {
  const Bar = () => (
    <MenuBar>
      <MenuBarItem label="File">
        <MenuItem label="Open" />
        <MenuItem label="Exit" />
      </MenuBarItem>
      <MenuBarItem label="Edit">
        <MenuItem label="Copy" />
      </MenuBarItem>
    </MenuBar>
  );

  it('toggles its menu and reports expansion', async () => {
    const user = userEvent.setup();
    render(<Bar />);

    const file = screen.getByRole('menuitem', { name: 'File' });
    expect(file).toHaveAttribute('aria-expanded', 'false');

    await user.click(file);
    expect(file).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'File' })).toBeVisible();

    await user.click(file);
    expect(file).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes after a command is chosen', async () => {
    const user = userEvent.setup();
    render(<Bar />);

    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.click(screen.getByRole('menuitem', { name: 'Open' }));

    expect(screen.getByRole('menuitem', { name: 'File' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('points aria-controls at the menu it owns', async () => {
    const user = userEvent.setup();
    render(<Bar />);

    const file = screen.getByRole('menuitem', { name: 'File' });
    await user.click(file);

    expect(file.getAttribute('aria-controls')).toBe(screen.getByRole('menu', { name: 'File' }).id);
  });

  it('exposes the bar as a menubar', () => {
    render(<Bar />);
    expect(screen.getByRole('menubar')).toBeInTheDocument();
  });
});
