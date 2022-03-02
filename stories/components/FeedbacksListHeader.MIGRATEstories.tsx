import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";

import FeedbacksListHeader, {
  FeedbacksListHeaderProps,
} from "../../app/components/FeedbacksListHeader";

const meta: Meta = {
  title: "components/FeedbacksListHeader",
  component: FeedbacksListHeader,
};
export default meta;

const Template: ComponentStory<FC<FeedbacksListHeaderProps>> = (args) => (
  <FeedbacksListHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  feedbackCount: 6,
};

export const Empty = Template.bind({});
Empty.args = {
  feedbackCount: 0,
};
