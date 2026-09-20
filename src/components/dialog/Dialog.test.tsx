import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from '.';

/**
 * jsdom implements no HTMLDialogElement methods, so the component's fallback
 * path is what runs by default. These install a minimal spec-shaped
 * implementation to exercise the native path too.
 */
function installNativeDialog() {
  const calls = { showModal: 0, show: 0, close: 0 };
  const proto = HTMLElement.prototype as unknown as Record<string, unknown>;

  proto.showModal = function (this: HTMLElement) {
    calls.showModal += 1;
    this.setAttribute('open', '');
  };
  proto.show = function (this: HTMLElement) {
    calls.show += 1;
    this.setAttribute('open', '');
  };
  proto.close = function (this: HTMLElement, returnValue?: string) {
    calls.close += 1;
    this.removeAttribute('open');
    (this as HTMLDialogElement).returnValue = returnValue ?? '';
    this.dispatchEvent(new Event('close'));
  };

  return {
    calls,
    restore() {
      delete proto.showModal;
      delete proto.show;
      delete proto.close;
    },
  };
}

afterEach(() => {
  const proto = HTMLElement.prototype as unknown as Record<string, unknown>;
  delete proto.showModal;
  delete proto.show;
  delete proto.close;
});

describe('Dialog (fallback path, no HTMLDialogElement)', () => {
  it('reflects the open prop onto the attribute', () => {
    const { rerender } = render(<Dialog title="Confirm">Body</Dialog>);
    const dialog = document.querySelector('dialog')!;
    expect(dialog).not.toHaveAttribute('open');

    rerender(
      <Dialog open title="Confirm">
        Body
      </Dialog>,
    );
    expect(dialog).toHaveAttribute('open');
  });

  // Regression: this read `node.open`, which is undefined without
  // HTMLDialogElement, so the dialog could never be closed again.
  it('closes again when open goes back to false', () => {
    const { rerender } = render(
      <Dialog open title="Confirm">
        Body
      </Dialog>,
    );
    const dialog = document.querySelector('dialog')!;
    expect(dialog).toHaveAttribute('open');

    rerender(<Dialog title="Confirm">Body</Dialog>);
    expect(dialog).not.toHaveAttribute('open');
  });

  it('renders a title bar and wraps children in a window body', () => {
    render(
      <Dialog open title="Confirm">
        Are you sure?
      </Dialog>,
    );

    expect(document.querySelector('.title-bar-text')).toHaveTextContent('Confirm');
    expect(document.querySelector('.window-body')).toHaveTextContent('Are you sure?');
  });

  it('omits the body wrapper when asked', () => {
    render(
      <Dialog open withBody={false}>
        raw
      </Dialog>,
    );
    expect(document.querySelector('.window-body')).toBeNull();
  });

  it('omits the title bar when no title is given', () => {
    render(<Dialog open>Body</Dialog>);
    expect(document.querySelector('.title-bar')).toBeNull();
  });

  it('applies window styling and width', () => {
    render(
      <Dialog open width={320} className="mine">
        Body
      </Dialog>,
    );
    const dialog = document.querySelector('dialog')!;
    expect(dialog).toHaveClass('window', 'mine');
    expect(dialog).toHaveStyle({ width: '320px' });
  });
});

describe('Dialog (native path)', () => {
  it('uses showModal for modal dialogs', () => {
    const native = installNativeDialog();
    render(
      <Dialog open modal title="Confirm">
        Body
      </Dialog>,
    );

    expect(native.calls.showModal).toBe(1);
    expect(native.calls.show).toBe(0);
    native.restore();
  });

  it('uses show for non-modal dialogs', () => {
    const native = installNativeDialog();
    render(
      <Dialog open modal={false} title="Confirm">
        Body
      </Dialog>,
    );

    expect(native.calls.show).toBe(1);
    expect(native.calls.showModal).toBe(0);
    native.restore();
  });

  it('reports the return value through onClose', async () => {
    const native = installNativeDialog();
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog open title="Confirm" closable onClose={onClose}>
        Body
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(native.calls.close).toBe(1);
    expect(onClose).toHaveBeenCalledWith('close');
    native.restore();
  });

  it('does not reopen an already-open dialog on re-render', () => {
    const native = installNativeDialog();
    const { rerender } = render(
      <Dialog open title="A">
        Body
      </Dialog>,
    );
    rerender(
      <Dialog open title="B">
        Body
      </Dialog>,
    );

    expect(native.calls.showModal).toBe(1);
    native.restore();
  });
});
