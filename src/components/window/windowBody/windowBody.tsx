import { PolymorphicComponentPropsWithRef } from '@/types';
import React from 'react';
import { Slot } from '@/components/slot';

export type WindowBodyProps = PolymorphicComponentPropsWithRef<
  'div',
  {
    className?: string;
    /** Merge these props onto the single child element instead of rendering a div. */
    asChild?: boolean;
  }
>;

/** @deprecated Misspelled; use `WindowBodyProps`. Kept for backwards compatibility. */
export type WidnowBodyProps = WindowBodyProps;

export const WindowBody = React.forwardRef<HTMLDivElement, WindowBodyProps>(
  ({ as: Component = 'div', asChild, className, children, ...props }, ref) => {
    const Root = asChild ? Slot : Component;

    return (
      <Root ref={ref} className={`window-body${className ? ` ${className}` : ''}`} {...props}>
        {children}
      </Root>
    );
  },
);

WindowBody.displayName = 'WindowBody';
