import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import ApplicationLogo, {
  ApplicationLogoProps,
} from "../../app/components/UI/ApplicationLogo";

const meta: Meta = {
  title: "UI/ApplicationLogo",
  component: ApplicationLogo,
};

export default meta;

const Template: ComponentStory<FC<ApplicationLogoProps>> = (args) => (
  <ApplicationLogo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
