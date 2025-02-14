import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: {
      handles: ["click", "submit"],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
