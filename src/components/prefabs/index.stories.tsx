import type { Meta, StoryObj } from '@storybook/react-vite';
import { Desktop } from '.';

const meta: Meta<typeof Desktop> = {
  title: 'Example/Desktop',
  component: Desktop,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    titleBarProps: { control: 'object' },
    windowBodyProps: { control: 'object' },
    windowProps: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    titleBarProps: {
      title: 'Desktop Title',
      minimize: true,
      maximize: true,
      close: true,
      onMaximize: () => console.log('Maximize'),
      onMinimize: () => console.log('Minimize'),
      onClose: () => console.log('Close'),
    },
    windowProps: {
      className: 'window-class',
    },
    windowBodyProps: {
      className: 'window-body-class',
    },
    className: 'desktop-class',
  },
  render: (args) => (
    <Desktop {...args}>
      <div style={{ padding: '1rem' }}>
        <h3>Desktop Content</h3>
      </div>
    </Desktop>
  ),
};
