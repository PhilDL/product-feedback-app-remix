import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import React, { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import FeedbacksList, {
  FeedbacksListProps,
} from "../../app/components/FeedbacksList";
import { FeedbackModel } from "../../app/types/models";
import { mockedFeedbacks } from "../mock";

const meta: Meta = {
  title: "Components/FeedbacksList",
  component: FeedbacksList,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
  ],
};
export default meta;

const Template: ComponentStory<FC<FeedbacksListProps>> = (args) => (
  <FeedbacksList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  feedbacks: mockedFeedbacks,
};

export const Empty = Template.bind({});
Empty.args = {
  feedbacks: [],
};
