import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '.';


const meta: Meta<typeof Slider> = {
  title: 'Example/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    id: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    value: { control: 'text' },
    minLabel: { control: 'text' },
    maxLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Slider',
    id: 'slider',
    min: '0',
    max: '100',
    value: '50',
    minLabel: '0',
    maxLabel: '100',
  },
};
