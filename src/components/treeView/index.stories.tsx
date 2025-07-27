import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeView } from '.';

const meta: Meta<typeof TreeView> = {
  title: 'Example/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Item 1',
      },
      {
        label: 'Item 2',
        items: [
          {
            label: 'Item 2.1',
          },
          {
            label: 'Item 2.2',
          },
        ],
      },
      {
        label: 'Item 3',
      },
    ],
  },

  render: (args) => <TreeView {...args} />,
};

export const Empty: Story = {
  args: {
    items: [],
  },

  render: (args) => <TreeView {...args} />,
};
