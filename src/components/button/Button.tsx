import { forwardRef } from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';
import { Slot } from '@/components/slot';

export type ButtonProps = PolymorphicComponentPropsWithRef<
  'button',
  {
    /** Shorthand for text content. `children` wins when both are given. */
    label?: string;
    className?: string;
    disabled?: boolean;
    /** Merge these props onto the single child element instead of rendering a button. */
    asChild?: boolean;
  }
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as: Component = 'button', asChild, label, className, disabled, children, ...props }, ref) => {
    const Root = asChild ? Slot : Component;

    return (
      <Root ref={ref} className={className} disabled={disabled} {...props}>
        {children ?? label}
      </Root>
    );
  },
);

Button.displayName = 'Button';
