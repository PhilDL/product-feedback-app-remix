import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import Tag, { TagProps } from "../../app/components/UI/Tag";

const meta: Meta = {
  title: "UI/Tag",
  component: Tag,
  parameters: {
    backgrounds: {
      default: "white",
      values: [
        {
          name: "white",
          value: "white",
        },
      ],
    },
    layout: "padded",
  },
};

export default meta;

const Template: ComponentStory<FC<TagProps>> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Enhancement",
  role: "Default",
};

export const Selected = Template.bind({});
Selected.args = {
  children: "Feature",
  selected: true,
};
