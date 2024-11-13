import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from '.';

const meta: Meta<typeof CheckBox> = {
  title: 'Example/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'I am checked',
    id: 'example1',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'I am inactive',
    id: 'example2',
  },
};

export const CheckedAndDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'I am inactive but still checked',
    id: 'example3',
  },

  render: (args) => <CheckBox {...args} />,
};

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'I am inactive but still checked',
    id: 'example4',
  },

  render: (args) => <CheckBox {...args} />,
};
