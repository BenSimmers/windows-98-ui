import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '.';

// type SliderProps = PolymorphicComponentPropsWithRef<
//   'input',
//   {
//     className?: string;
//     label: string;
//     id: string;
//     min: number;
//     max: number;
//     value: number;
//     step?: number;
//     vertical?: boolean;
//     hasBoxIndicator?: boolean;
//   }
// >;

const meta: Meta<typeof Slider> = {
  title: 'Example/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    label: { control: 'text' },
    id: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    value: { control: 'text' },
    step: { control: 'text' },
    vertical: { control: 'boolean' },
    hasBoxIndicator: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Volume:',
    id: 'range25',
    min: '1',
    max: '11',
    value: '5',
  },
};
