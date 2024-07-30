import { PolymorphicComponentPropsWithRef } from '@/types';
import React from 'react';

type Options = Record<string, string>[];

export type DropdownProps = PolymorphicComponentPropsWithRef<"select", {
  className?: string;
  options: Options;

}>;

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(({
  as: Component = "select",
  className,
  options,
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={className}
      {...props}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </Component>
  );
});

Dropdown.displayName = "Dropdown";
