import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import withFormik from "storybook-formik";
import TextField from "../../app/components/UI/TextField";
import type { TextFieldProps } from "../../app/components/UI/TextField";

const meta: Meta = {
  decorators: [withFormik],
  title: "UI/TextField",
  component: TextField,
  parameters: {
    formik: {
      initialValues: {
        title: "",
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

const Template: ComponentStory<FC<TextFieldProps>> = (args) => (
  <TextField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  className: "",
  help: "Add a short descriptive headline",
  label: "Feedback Title",
  name: "title",
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  className: "",
  help: "Add a short descriptive headline",
  label: "Feedback Title",
  name: "title",
  errors: ["Feedback should be more than 30 characters"],
};
