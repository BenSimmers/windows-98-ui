import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';

export type CheckBoxProps = PolymorphicComponentPropsWithRef<
  'input',
  {
    id: string;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
  }
>;

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ as: Component = 'input', id, checked, disabled, label, ...props }, ref) => {
    return (
      <div className="field-row">
        <Component id={id} ref={ref} type="checkbox" checked={checked} disabled={disabled} {...props} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  },
);

CheckBox.displayName = 'CheckBox';
