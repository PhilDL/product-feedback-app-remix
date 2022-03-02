import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import TagsCloud, { TagsCloudProps } from "../../app/components/TagsCloud";

const meta: Meta = {
  title: "Components/TagsCloud",
  component: TagsCloud,
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

const Template: ComponentStory<FC<TagsCloudProps>> = (args) => (
  <TagsCloud {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tags: [
    { id: 1, created_at: "2022-02-21T18:18:13+00:00", name: "UI" },
    { id: 2, created_at: "2022-02-21T18:18:20+00:00", name: "UX" },
    { id: 3, created_at: "2022-02-21T18:18:24+00:00", name: "Bug" },
    {
      id: 4,
      created_at: "2022-02-21T18:18:31+00:00",
      name: "Enhancement",
    },
    { id: 5, created_at: "2022-02-21T18:18:46+00:00", name: "Feature" },
  ],
  selectedCategoryId: null,
};

export const TagActive = Template.bind({});
TagActive.args = {
  tags: [
    { id: 1, created_at: "2022-02-21T18:18:13+00:00", name: "UI" },
    { id: 2, created_at: "2022-02-21T18:18:20+00:00", name: "UX" },
    { id: 3, created_at: "2022-02-21T18:18:24+00:00", name: "Bug" },
    {
      id: 4,
      created_at: "2022-02-21T18:18:31+00:00",
      name: "Enhancement",
    },
    { id: 5, created_at: "2022-02-21T18:18:46+00:00", name: "Feature" },
  ],
  selectedCategoryId: 3,
};
