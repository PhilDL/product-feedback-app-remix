import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import React, { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import { CommentModel } from "../../app/types/models";
import CommentsList, {
  CommentsListProps,
} from "../../app/components/CommentsList";

const meta: Meta = {
  title: "Components/CommentsList",
  component: CommentsList,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
  ],
  parameters: {
    layout: "padded",
  },
};

export default meta;
const Template: ComponentStory<FC<CommentsListProps>> = (args) => (
  <CommentsList {...args} />
);

const comments = [
  {
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
  },
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
  },
  {
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
  },
  {
    id: 41,
    created_at: "2022-02-25T21:28:01.022239+00:00",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    content: "Cool reply",
    feedback_id: 8,
    parent_id: 36,
    has_replies: false,
    replying_to: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    replying_to_user: {
      id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
      username: "Jdodo",
      avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
      full_name: "John DoeDoe",
    },
  },
  {
    id: 42,
    created_at: "2022-02-25T21:28:31.745351+00:00",
    user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
    content: "This is another reply",
    feedback_id: 8,
    parent_id: 37,
    has_replies: false,
    replying_to: "201d83bd-d464-4d17-9e16-654942e3af15",
    user: {
      id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
      username: "Jdodo",
      avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
      full_name: "John DoeDoe",
    },
    replying_to_user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
  },
  {
    id: 43,
    created_at: "2022-02-25T21:28:50.300604+00:00",
    user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It h",
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
  },
];

export const Default = Template.bind({});
Default.args = {
  comments: comments,
  totalComments: 9,
};
