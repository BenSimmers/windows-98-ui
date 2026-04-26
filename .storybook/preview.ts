import type { Preview } from '@storybook/react-vite';
import { createElement } from 'react';
import { Win98Provider } from '../src/components/provider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => createElement(Win98Provider, null, createElement(Story)),
  ],

  tags: ['autodocs']
};

export default preview;

