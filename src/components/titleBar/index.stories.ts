// import { PolymorphicComponentProps } from '@/types';
// import React from 'react';

// type TitleBarProps = PolymorphicComponentProps<
//   'div',
//   { inactive?: boolean; title?: string; minimize?: boolean; maximize?: boolean; close?: boolean }
// >;

// export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
//   ({ as: Component = 'div', inactive, title, minimize, maximize, close, ...props }, ref) => {
//     return (
//       <Component ref={ref} className={`title-bar ${inactive ? 'inactive' : ''}`} {...props}>
//         <div className="title-bar-text">{title}</div>
//         <div className="title-bar-controls">
//           {minimize && <button aria-label="Minimize"></button>}
//           {maximize && <button aria-label="Maximize"></button>}
//           {close && <button aria-label="Close"></button>}
//         </div>
//       </Component>
//     );
//   },
// );

import type { Meta, StoryObj } from "@storybook/react";
import { TitleBar } from ".";

const meta: Meta<typeof TitleBar> = {
  title: "Example/TitleBar",
  component: TitleBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inactive: { control: "boolean" },
    title: { control: "text" },
    minimize: { control: "boolean" },
    maximize: { control: "boolean" },
    close: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    minimize: true,
    maximize: true,
    close: true,
  },
};

export const Inactive: Story = {
  args: {
    title: "Inactive",
    inactive: true,
  },
};

export const NoControls: Story = {
  args: {
    title: "No Controls",
  },
};

export const NoTitle: Story = {
  args: {
    minimize: true,
    maximize: true,
    close: true,
  },
};

export const NoTitleNoControls: Story = {
  args: {},
};