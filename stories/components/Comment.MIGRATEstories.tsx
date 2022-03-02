import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import React, { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import Comment, { CommentProps } from "../../app/components/Comment";
import { CommentModel } from "../../app/types/models";

const meta: Meta = {
  title: "Components/Comment",
  component: Comment,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
  ],
  parameters: {
    backgrounds: {
      default: "white",
      values: [
        {
          name: "white",
          value: "#fff",
        },
      ],
    },
    layout: "padded",
  },
};

export default meta;

const Template: ComponentStory<FC<CommentProps>> = (args) => (
  <Comment {...args} />
);

const comment = {
  id: 37,
  created_at: "2022-02-24T18:25:57.677631+00:00",
  user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
  content: "Grat idea",
  feedback_id: 8,
  parent_id: null,
  has_replies: false,
  replying_to: null,
  user: {
    id: "201d83bd-d464-4d17-9e16-654942e3af15",
    username: "_philDL",
    avatar_url:
      "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
    full_name: "Philippe L'ATTENTION",
  },
  replying_to_user: null,
  replies: [],
};
const commentWithReplies: CommentModel = {
  id: 35,
  created_at: "2022-02-24T16:30:11.667834+00:00",
  user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
  content:
    "Good idea because this product feedback app is too light for me !!! ",
  feedback_id: 8,
  parent_id: null,
  has_replies: false,
  replying_to: null,
  user: {
    id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
    username: "Jdodo",
    avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
    full_name: "John DoeDoe",
  },
  replying_to_user: null,
  replies: [
    {
      id: 36,
      created_at: "2022-02-24T17:55:15.416332+00:00",
      user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
      content: "Yes",
      feedback_id: 8,
      parent_id: 35,
      has_replies: false,
      replying_to: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
      user: {
        id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        username: "Jdodo",
        avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
        full_name: "John DoeDoe",
      },
      replying_to_user: {
        id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        username: "Jdodo",
        avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
        full_name: "John DoeDoe",
      },

      replies: [],
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  comment: comment,
};

export const WithReplies = Template.bind({});
WithReplies.args = {
  comment: commentWithReplies,
};
