import { PolymorphicComponentProps } from '@/types';
import React from 'react';

type TitleBarProps = PolymorphicComponentProps<
  'div',
  { className?: string, inactive?: boolean; title?: string; minimize?: boolean; maximize?: boolean; close?: boolean }
>;

export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
  ({ as: Component = 'div', className, inactive, title, minimize, maximize, close, ...props }, ref) => {
    return (
      <Component ref={ref} className={`title-bar ${inactive ? 'inactive' : ''} ${className || ''}`} {...props}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {minimize && <button aria-label="Minimize"></button>}
          {maximize && <button aria-label="Maximize"></button>}
          {close && <button aria-label="Close"></button>}
        </div>
      </Component>
    );
  },
);
