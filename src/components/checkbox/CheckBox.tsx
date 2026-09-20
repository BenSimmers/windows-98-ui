import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';
import { useStableId } from '@/utils/useStableId';

export type CheckBoxProps = PolymorphicComponentPropsWithRef<
  'input',
  {
    /** Optional — one is generated when omitted. */
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
  }
>;

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ as: Component = 'input', id, checked, disabled, label, ...props }, ref) => {
    const inputId = useStableId(id);

    return (
      <div className="field-row">
        <Component id={inputId} ref={ref} type="checkbox" checked={checked} disabled={disabled} {...props} />
        {label && <label htmlFor={inputId}>{label}</label>}
      </div>
    );
  },
);

CheckBox.displayName = 'CheckBox';
