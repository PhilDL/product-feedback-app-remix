import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";

import Button, { ButtonProps } from "../../app/components/UI/Button";

const meta: Meta = {
  title: "UI/Button",
  component: Button,
};

export default meta;

const Template: ComponentStory<FC<ButtonProps>> = (args) => (
  <Button {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: "+ Add Feedback",
  role: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Edit Feedback",
  role: "secondary",
};

export const Default = Template.bind({});
Default.args = {
  children: "Cancel",
  role: "default",
};

export const Danger = Template.bind({});
Danger.args = {
  children: "Delete",
  role: "danger",
};
