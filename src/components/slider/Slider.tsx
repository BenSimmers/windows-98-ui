import React from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';

{
  /* <div class="field-row" style="width: 300px">
  <label for="range25">Volume:</label>
  <label for="range26">Low</label>
  <input id="range26" type="range" min="1" max="11" value="5" />
  <label for="range27">High</label>
</div>

 You can make use of the has-box-indicator class replace the default indicator with a box indicator, furthermore the slider can be wrapped with a div using is-vertical to display the input vertically.

Note: To change the length of a vertical slider, the input width and div height.



<div class="field-row">
  <label for="range28">Cowbell</label>
  <div class="is-vertical">
    <input id="range28" class="has-box-indicator" type="range" min="1" max="3" step="1" value="2" />
  </div>
</div> */
}

type SliderProps = PolymorphicComponentPropsWithRef<
  'input',
  {
    className?: string;
    label: string;
    id: string;
    min: string;
    max: string;
    value: string;
    step?: string;
    vertical?: boolean;
    hasBoxIndicator?: boolean;
  }
>;

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { as: Component = 'input', className, label, id, min, max, value, step, vertical, hasBoxIndicator, ...props },
    ref,
  ) => {
    return (
      <div className="field-row" style={{ width: vertical ? '300px' : 'auto' }}>
        <label htmlFor={id}>{label}</label>
        <div className={vertical ? 'is-vertical' : ''}>
          <Component
            ref={ref}
            className={className}
            id={id}
            type="range"
            min={min}
            max={max}
            value={value}
            step={step}
            {...props}
          />
        </div>
      </div>
    );
  },
);
