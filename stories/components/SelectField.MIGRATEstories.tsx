import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import withFormik from "storybook-formik";
import SelectField, {
  SelectFieldProps,
} from "../../app/components/UI/SelectField";

const meta: Meta = {
  decorators: [withFormik],
  title: "UI/SelectField",
  component: SelectField,
  parameters: {
    formik: {
      initialValues: {
        category: 3,
      },
    },
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

const Template: ComponentStory<FC<SelectFieldProps>> = (args) => (
  <SelectField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  options: [
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
  defaultValue: 3,
  name: "category",
  help: "Choose a category for your feedback",
  label: "Category",
};
