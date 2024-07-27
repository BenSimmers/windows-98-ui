{/* <select>
  <option>5 - Incredible!</option>
  <option>4 - Great!</option>
  <option>3 - Pretty good</option>
  <option>2 - Not so great</option>
  <option>1 - Unfortunate</option>
</select> */}

import { PolymorphicComponentPropsWithRef } from '@/types';
import React from 'react';


type Options = Record<string, string>[];

export type DropdownProps = PolymorphicComponentPropsWithRef<"select", {
  label: string;
  className?: string;
  options: Options;

}>;

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(({
  as: Component = "select",
  label,
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

