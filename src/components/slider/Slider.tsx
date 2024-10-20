import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';

type SliderProps = PolymorphicComponentPropsWithRef<
  'input',
  { label?: string; id: string; min: string; max: string; value: string; minLabel?: string; maxLabel?: string }
>;

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ as: Component = 'input', label, id, min, max, value, minLabel, maxLabel, ...props }, ref) => {
    return (
      <div className="field-row" style={{ width: '300px' }}>
        {!label ? null : <label htmlFor={id}>{label}</label>}
        {!minLabel ? null : <label htmlFor={id}>{minLabel}</label>}
        <Component ref={ref} id={id} type="range" min={min} max={max} value={value} {...props} />
        {!maxLabel ? null : <label htmlFor={id}>{maxLabel}</label>}
      </div>
    );
  },
);

Slider.displayName = 'Slider';
