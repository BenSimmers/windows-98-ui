import { PolymorphicComponentPropsWithRef } from '@/types';
import React from 'react';

export type WindowProps = PolymorphicComponentPropsWithRef<
  'div',
  { className?: string; width?: string; height?: string }
>;

export const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`window ${className}`}
        {...props}
        style={{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }}
      >
        {children}
      </Component>
    );
  },
);

Window.displayName = 'Window';
