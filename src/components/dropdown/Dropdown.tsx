import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';

type Option = {
  value: string;
  label: string;
};

type Options = Option[];

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
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Component>
  );
});

Dropdown.displayName = "Dropdown";
