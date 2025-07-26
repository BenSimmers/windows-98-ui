import { forwardRef } from 'react';
import '98.css'; 
import { PolymorphicComponentPropsWithRef } from '@/types';

export type ProgressProps = PolymorphicComponentPropsWithRef<'div'> & {
  variant?: '' | 'segmented';
  value?: number;
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ variant = '', value = 0, ...props }, ref) => {
    const width = Math.max(0, Math.min(100, Number(value)));

    return (
      <div className={`progress-indicator${variant ? ` ${variant}` : ''}`} {...props} ref={ref}>
        <span className="progress-indicator-bar" style={{ width: `${width}%` }} />
      </div>
    );
  }
);

Progress.displayName = 'Progress';
