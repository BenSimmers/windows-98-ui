import { forwardRef } from 'react';
import '98.css';
import { PolymorphicComponentPropsWithRef } from '@/types';

export type ProgressProps = PolymorphicComponentPropsWithRef<'div'> & {
  variant?: 'default' | 'segmented';
  value?: number;
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(({ variant = 'default', value = 0, ...props }, ref) => {
  return (
    <div className={`progress-indicator ${variant}`} {...props} ref={ref}>
      <span className="progress-indicator-bar" style={{ width: `${value}%` }} />
    </div>
  );
});

Progress.displayName = 'Progress';
