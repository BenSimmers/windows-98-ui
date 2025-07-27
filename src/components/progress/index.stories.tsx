import type { Meta, StoryObj } from '@storybook/react-vite';
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
      options: ['', 'segmented'], // Correct options
      control: { type: 'select' },
      mapping: {
        '': '',
        segmented: 'segmented',
      },
      labels: {
        '': 'default',
        segmented: 'segmented',
      },
    },
    value: { control: { type: 'number', min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: '', // must match actual class logic
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
