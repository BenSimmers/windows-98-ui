import type { Preview } from '@storybook/react-vite';
import '98.css'; // Ensure 98.css is imported globally
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs']
};

export default preview;
