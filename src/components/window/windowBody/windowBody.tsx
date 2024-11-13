import { PolymorphicComponentPropsWithRef } from "@/types";
import React from "react";

export type WidnowBodyProps = PolymorphicComponentPropsWithRef<'div', { className?: string }>;

export const WindowBody = React.forwardRef<HTMLDivElement, WidnowBodyProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={`window-body ${className}`} {...props}>
        {children}
      </Component>
    );
  },
);

WindowBody.displayName = 'WindowBody';
