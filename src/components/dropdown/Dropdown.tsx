import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';
import { useStableId } from '@/utils/useStableId';

type Option = {
  value: string;
  label: string;
};

type Options = Option[];

export type DropdownProps = PolymorphicComponentPropsWithRef<
  'select',
  {
    className?: string;
    options: Options;
    /** Renders an associated `<label>` and wraps the select in a field row. */
    label?: string;
    /** Optional — one is generated when omitted. */
    id?: string;
  }
>;

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ as: Component = 'select', className, options, label, id, ...props }, ref) => {
    const selectId = useStableId(id);

    const select = (
      <Component ref={ref} className={className} id={selectId} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Component>
    );

    if (!label) return select;

    return (
      <div className="field-row">
        <label htmlFor={selectId}>{label}</label>
        {select}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
