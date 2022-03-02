import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import Upvote, { UpvoteProps } from "../../app/components/UI/Upvote";

const meta: Meta = {
  title: "UI/Upvote",
  component: Upvote,
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

const Template: ComponentStory<FC<UpvoteProps>> = (args) => (
  <Upvote {...args} />
);

export const Default = Template.bind({});
Default.args = {
  count: 99,
  active: false,
};

export const Active = Template.bind({});
Active.args = {
  count: 99,
  active: true,
};
