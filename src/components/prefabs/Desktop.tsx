import { forwardRef } from 'react';
import '98.css';
import { PolymorphicComponentPropsWithRef } from '@/types';

import { TitleBar, TitleBarProps } from '../titleBar';
import { Window, WindowProps } from '../window/windowContainer';
import { WindowBody, WidnowBodyProps } from '../window/windowBody';

export type DesktopProps = PolymorphicComponentPropsWithRef<
  'div',
  {
    titleBarProps?: TitleBarProps;
    windowProps?: WindowProps;
    windowBodyProps?: WidnowBodyProps;
    className?: string;
  }
>;

export const Desktop = forwardRef<HTMLDivElement, DesktopProps>(
  ({ as: Component = 'div', titleBarProps, windowProps, windowBodyProps, className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={`desktop ${className}`} {...props}>
        <TitleBar {...titleBarProps} />
        <Window {...windowProps}>
          <WindowBody {...windowBodyProps}>{children}</WindowBody>
        </Window>
      </Component>
    );
  },
);

Desktop.displayName = 'Desktop';
