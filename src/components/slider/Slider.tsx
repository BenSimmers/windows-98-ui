import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';

type SliderProps = PolymorphicComponentPropsWithRef<
  'input',
  {
    label?: string;
    type?: string;
    id: string;
    min: number | string;
    max: number | string;
    value: number | string;
    minLabel?: string;
    maxLabel?: string;
  }
>;

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ as: Component = 'input', label, id, min, max, value, minLabel, maxLabel, type = 'range', ...props }, ref) => {
    return (
      <div className="field-row" style={{ width: '300px' }}>
        {label && <label htmlFor={id}>{label}</label>}
        {minLabel && <label htmlFor={id}>{minLabel}</label>}
        <Component type={type} ref={ref} id={id} min={min} max={max} value={value} {...props} />
        {maxLabel && <label htmlFor={id}>{maxLabel}</label>}
      </div>
    );
  },
);

Slider.displayName = 'Slider';
