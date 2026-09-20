import { PolymorphicComponentPropsWithRef } from '@/types';
import React from 'react';
import { Slot } from '@/components/slot';

export type WindowProps = PolymorphicComponentPropsWithRef<
  'div',
  {
    className?: string;
    /** Number is treated as pixels; a string is used verbatim. */
    width?: number | string;
    height?: number | string;
    /** Merge these props onto the single child element instead of rendering a div. */
    asChild?: boolean;
  }
>;

const toLength = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : value);

export const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  ({ as: Component = 'div', asChild, className, children, width, height, style, ...props }, ref) => {
    const Root = asChild ? Slot : Component;

    return (
      <Root
        ref={ref}
        className={`window${className ? ` ${className}` : ''}`}
        {...props}
        // Caller styles win, and dimensions are only emitted when supplied.
        style={{ width: toLength(width), height: toLength(height), ...style }}
      >
        {children}
      </Root>
    );
  },
);

Window.displayName = 'Window';
