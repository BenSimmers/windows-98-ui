import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';
{
  /* <div class="field-row">
  <input checked type="checkbox" id="example2">
  <label for="example2">I am checked</label>
</div>
<div class="field-row">
  <input disabled type="checkbox" id="example3">
  <label for="example3">I am inactive</label>
</div>
<div class="field-row">
  <input checked disabled type="checkbox" id="example4">
  <label for="example4">I am inactive but still checked</label>
</div> */
}

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
