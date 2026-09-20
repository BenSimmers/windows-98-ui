import { PolymorphicComponentPropsWithRef } from '@/types';
import React from 'react';
import { useStableId } from '@/utils/useStableId';

export type TextBoxProps = PolymorphicComponentPropsWithRef<
  'input',
  {
    className?: string;
    label?: string;
    /** Optional — one is generated when omitted. */
    id?: string;
    type?: string;
    stacked?: boolean;
  }
>;

export const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
  ({ as: Component = 'input', className, label, id, type = 'text', stacked, ...props }, ref) => {
    const inputId = useStableId(id);

    return (
      <div className={stacked ? 'field-row-stacked' : 'field-row'}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <Component ref={ref} className={className} id={inputId} type={type} {...props} />
      </div>
    );
  },
);

TextBox.displayName = 'TextBox';
