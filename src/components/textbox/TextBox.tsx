import { PolymorphicComponentPropsWithRef } from '@/types';
import React from 'react';

type TextBoxProps<T> = PolymorphicComponentPropsWithRef<
  'input',
  {
    className?: string;
    label: string;
    id: T;
    type: string;
    stacked?: boolean;
  }
>;

export const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps<string>>(
  ({ as: Component = 'input', className, label, id, type, stacked, ...props }, ref) => {
    return (
      <div className={stacked ? 'field-row-stacked' : 'field-row'}>
        <label htmlFor={id}>{label}</label>
        <Component ref={ref} className={className} id={id} type={type} {...props} />
      </div>
    );
  },
);
