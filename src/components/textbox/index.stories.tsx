import { Meta, StoryObj } from "@storybook/react";
import { TextBox } from ".";



const meta: Meta<typeof TextBox> = {
  title: "Example/TextBox",
  component: TextBox,
  parameters: {
    layout: "centered", 
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    id: { control: "text" },
    type: { control: "text" },
    stacked: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Occupation",
    id: "text17",
    type: "text",
  },
};

export const Stacked: Story = {
  args: {
    label: "Address (Line 1)",
    id: "text18",
    type: "text",
    stacked: true,
  },
};

export const Stacked2: Story = {
  args: {
    label: "Address (Line 2)",
    id: "text19",
    type: "text",
    stacked: true,
  },
};

export const NoStacked: Story = {
  args: {
    label: "Address (Line 3)",
    id: "text20",
    type: "text",
  },
};


