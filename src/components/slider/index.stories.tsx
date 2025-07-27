import { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '.';
import { ChangeEvent, useState } from 'react';
import React from 'react';

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
    const [sliderValue, setSliderValue] = useState(args.value);

    const onChange = React.useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setSliderValue(event.target.value);
        args.value = event.target.value;
      },
      [args],
    );

    return <Slider {...args} value={sliderValue} onChange={onChange} />;
  },
};
