import type { Meta, StoryObj } from '@storybook/react-vite';
import { WindowBody } from '.';

const meta: Meta<typeof WindowBody> = {
  title: 'Example/WindowBody',
  component: WindowBody,
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
    as: "div"
  },

  render: (args) => <WindowBody {...args} />,
  
}
