import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';
import { useStableId } from '@/utils/useStableId';

export type SliderProps = PolymorphicComponentPropsWithRef<
  'input',
  {
    label?: string;
    type?: string;
    /** Optional — one is generated when omitted. */
    id?: string;
    min: number | string;
    max: number | string;
    value?: number | string;
    minLabel?: string;
    maxLabel?: string;
  }
>;

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ as: Component = 'input', label, id, min, max, value, minLabel, maxLabel, type = 'range', ...props }, ref) => {
    const inputId = useStableId(id);

    return (
      <div className="field-row" style={{ width: '300px' }}>
        {label && <label htmlFor={inputId}>{label}</label>}
        {minLabel && <label aria-hidden="true">{minLabel}</label>}
        <Component type={type} ref={ref} id={inputId} min={min} max={max} value={value} {...props} />
        {maxLabel && <label aria-hidden="true">{maxLabel}</label>}
      </div>
    );
  },
);

Slider.displayName = 'Slider';
