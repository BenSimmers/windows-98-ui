import { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '.';
import { ChangeEvent } from 'react';
import { useArgs } from 'storybook/internal/preview-api';

const meta: Meta<typeof Slider> = {
  title: 'Example/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    id: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    value: { control: 'number' },
    minLabel: { control: 'text' },
    maxLabel: { control: 'text' },
    onChange: { action: 'value changed' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Slider',
    id: 'slider',
    min: 0,
    max: 100,
    value: 50,
    minLabel: '0',
    maxLabel: '100',
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();
    return (
      <Slider
        {...args}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => updateArgs({ value: Number(event.target.value) })}
      />
    );
  },
};
