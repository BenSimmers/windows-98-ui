import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckBox } from '.';
import { useArgs } from 'storybook/internal/preview-api';

const meta: Meta<typeof CheckBox> = {
  title: 'Example/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <Story />],
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

const InteractiveRender: Story['render'] = (args) => {
  const [{ checked }, updateArgs] = useArgs();
  return <CheckBox {...args} checked={checked} onChange={() => updateArgs({ checked: !checked })} />;
};

export const Checked: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'I am checked',
    id: 'example1',
  },
  render: InteractiveRender,
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'I am inactive',
    id: 'example2',
  },
  render: InteractiveRender,
};

export const CheckedAndDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'I am inactive but still checked',
    id: 'example3',
  },
  render: InteractiveRender,
};

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'I am inactive but still checked',
    id: 'example4',
  },
  render: InteractiveRender,
};
