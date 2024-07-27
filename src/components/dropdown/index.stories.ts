import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from ".";

const meta: Meta<typeof Dropdown> = {
  title: "Example/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    className: { control: "text" },
    options: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Dropdown",
    options: [
      { value: "5", label: "5 - Incredible!" },
      { value: "4", label: "4 - Great!" },
      { value: "3", label: "3 - Pretty good" },
      { value: "2", label: "2 - Not so great" },
      { value: "1", label: "1 - Unfortunate" },
    ],
  },
};
