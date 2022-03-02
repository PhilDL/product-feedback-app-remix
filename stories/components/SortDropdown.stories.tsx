import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import SortDropdown, {
  SortDropdownProps,
} from "../../app/components/UI/SortDropdown";

const meta: Meta = {
  title: "UI/SortDropdown",
  component: SortDropdown,
  parameters: {
    backgrounds: {
      default: "navbar",
      values: [
        {
          name: "navbar",
          value: "hsl(230 31% 31%)",
        },
      ],
    },
    layout: "centered",
  },
};

export default meta;

const Template: ComponentStory<FC<SortDropdownProps>> = (args) => (
  <SortDropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  options: {
    "most-upvotes": "Most Upvotes",
    "least-upvotes": "Least Upvotes",
    "most-comments": "Most Comments",
    "least-comments": "Least Comments",
  },
  defaultValue: "most-upvotes",
  inputName: "sort",
  onChangeSort: (value: string) => {
    console.log("Change sort to:", value);
  },
};
