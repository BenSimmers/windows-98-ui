import type { Meta, StoryObj } from '@storybook/react';
import { Window } from '.';

const meta: Meta<typeof Window> = {
  title: 'Example/Window',
  component: Window,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "",
  },
};
