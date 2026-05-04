import { Meta, StoryObj } from "@storybook/react-vite";
import { TextBox } from ".";
import { useArgs } from "storybook/internal/preview-api";



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
    value: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const InteractiveRender: Story['render'] = (args) => {
  const [{ value }, updateArgs] = useArgs();
  return <TextBox {...args} value={value ?? ''} onChange={(e) => updateArgs({ value: e.target.value })} />;
};

export const Default: Story = {
  args: {
    label: "Occupation",
    id: "text17",
    type: "text",
    value: "",
  },
  render: InteractiveRender,
};

export const Stacked: Story = {
  args: {
    label: "Address (Line 1)",
    id: "text18",
    type: "text",
    stacked: true,
    value: "",
  },
  render: InteractiveRender,
};

export const Stacked2: Story = {
  args: {
    label: "Address (Line 2)",
    id: "text19",
    type: "text",
    stacked: true,
    value: "",
  },
  render: InteractiveRender,
};

export const NoStacked: Story = {
  args: {
    label: "Address (Line 3)",
    id: "text20",
    type: "text",
    value: "",
  },
  render: InteractiveRender,
};


