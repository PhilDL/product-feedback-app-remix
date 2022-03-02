import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import React, { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import AddCommentForm, {
  AddCommentFormProps,
} from "../../app/components/AddCommentForm";

const meta: Meta = {
  title: "Components/AddCommentForm",
  component: AddCommentForm,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
  ],
};

export default meta;

const Template: ComponentStory<FC<AddCommentFormProps>> = (args) => (
  <AddCommentForm {...args} />
);

// export const Default = Template.bind({});
// Default.args = {
//   feedbackId: "3",
//   // replyToCommentId: "1",
// };
