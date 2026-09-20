import * as React from 'react';
import { TitleBar } from '@/components/titleBar';
import { WindowBody } from '@/components/window/windowBody';
import { useIsomorphicLayoutEffect } from '@/utils/useIsomorphicLayoutEffect';

export type DialogProps = Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'onClose'> & {
  open?: boolean;
  /** Modal dialogs render in the top layer and get a backdrop. */
  modal?: boolean;
  title?: string;
  /** Show the title bar's close button. */
  closable?: boolean;
  /** Fired by the close button, Escape, or a form method="dialog" submit. */
  onClose?: (returnValue: string) => void;
  /** Wrap children in a `.window-body`. Turn off to lay the body out yourself. */
  withBody?: boolean;
  width?: number | string;
  className?: string;
  children?: React.ReactNode;
};

const toLength = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : value);

/**
 * A Windows 98 dialog built on the native `<dialog>` element, so focus
 * trapping, the top layer, the backdrop and Escape-to-close come from the
 * platform rather than from JavaScript.
 *
 * @example
 * <Dialog open={open} modal title="Confirm" closable onClose={() => setOpen(false)}>
 *   Are you sure?
 * </Dialog>
 */
export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open = false,
      modal = true,
      title,
      closable = true,
      onClose,
      withBody = true,
      width,
      className,
      children,
      style,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = React.useRef<HTMLDialogElement | null>(null);

    const setRef = React.useCallback(
      (node: HTMLDialogElement | null) => {
        ref.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    // `open` is a prop here but an imperative call on the element: only
    // showModal() puts it in the top layer and lights up ::backdrop.
    useIsomorphicLayoutEffect(() => {
      const node = ref.current;
      if (!node) return;

      // Read openness from the attribute, not `node.open`: the property is
      // undefined wherever HTMLDialogElement is unimplemented, which would
      // strand the dialog open.
      const isOpen = node.hasAttribute('open');

      if (open && !isOpen) {
        if (modal && typeof node.showModal === 'function') node.showModal();
        else if (typeof node.show === 'function') node.show();
        else node.setAttribute('open', '');
      } else if (!open && isOpen) {
        if (typeof node.close === 'function') node.close();
        else node.removeAttribute('open');
      }
    }, [open, modal]);

    const handleClose = React.useCallback(
      (event: React.SyntheticEvent<HTMLDialogElement>) => {
        onClose?.(event.currentTarget.returnValue);
      },
      [onClose],
    );

    return (
      <dialog
        ref={setRef}
        className={`window${className ? ` ${className}` : ''}`}
        onClose={handleClose}
        style={{ width: toLength(width), ...style }}
        {...props}
      >
        {title !== undefined && (
          <TitleBar title={title} close={closable} onClose={() => ref.current?.close('close')} />
        )}
        {withBody ? <WindowBody>{children}</WindowBody> : children}
      </dialog>
    );
  },
);

Dialog.displayName = 'Dialog';
