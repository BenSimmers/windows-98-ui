import type { Meta, StoryObj } from '@storybook/react-vite';
import { TitleBar } from '.';

const meta: Meta<typeof TitleBar> = {
  title: 'Example/TitleBar',
  component: TitleBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    inactive: { control: 'boolean' },
    title: { control: 'text' },
    minimize: { control: 'boolean' },
    maximize: { control: 'boolean' },
    close: { control: 'boolean' },
    onMaximize: { action: 'maximize' },
    onMinimize: { action: 'minimize' },
    onClose: { action: 'close' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    minimize: true,
    maximize: true,
    close: true,
    onMaximize: () => console.log('Maximize'),
    onMinimize: () => console.log('Minimize'),
    onClose: () => console.log('Close'),
  },
};

export const Inactive: Story = {
  args: {
    title: 'Inactive',
    inactive: true,
  },
};

export const NoControls: Story = {
  args: {
    title: 'No Controls',
  },
};

export const NoTitle: Story = {
  args: {
    minimize: true,
    maximize: true,
    close: true,
    onMaximize: () => console.log('Maximize'),
    onMinimize: () => console.log('Minimize'),
    onClose: () => console.log('Close'),
  },
};
