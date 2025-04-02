import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '.';

const meta: Meta<typeof Progress> = {
  title: 'Example/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'segmented'],
      control: { type: 'select' },
    },
    value: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    variant: 'default',
    value: 50,
  },
  render: (args) => <Progress {...args} />,
};

export const Segmented: Story = {
  args: {
    variant: 'segmented',
    value: 75,
  },
  render: (args) => <Progress {...args} />,
};

export const SegmentedWithValue: Story = {
  args: {
    variant: 'segmented',
    value: 100,
  },
  render: (args) => <Progress {...args} />,
};
