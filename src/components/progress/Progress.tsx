import { forwardRef } from 'react';
import { PolymorphicComponentPropsWithRef } from '@/types';

export type ProgressProps = PolymorphicComponentPropsWithRef<'div'> & {
  variant?: '' | 'segmented';
  value?: number;
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ variant = '', value = 0, className, ...props }, ref) => {
    const width = Math.max(0, Math.min(100, Number(value)));

    return (
      <div
        {...props}
        ref={ref}
        className={`progress-indicator${variant ? ` ${variant}` : ''}${className ? ` ${className}` : ''}`}
      >
        <span className="progress-indicator-bar" style={{ width: `${width}%` }} />
      </div>
    );
  }
);

Progress.displayName = 'Progress';
