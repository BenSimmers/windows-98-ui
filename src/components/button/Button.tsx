import { forwardRef } from 'react';
import "98.css";
import { PolymorphicComponentPropsWithRef } from '@/types';


export type ButtonProps = PolymorphicComponentPropsWithRef<"button", {
  label: string;
  className?: string;
  disabled?: boolean;
}>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  as: Component = "button",
  label,
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={className}
      disabled={disabled}
      {...props}
    >
      {label}
    </Component>
  );
});

Button.displayName = "Button";
