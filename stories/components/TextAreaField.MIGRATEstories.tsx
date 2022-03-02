import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import withFormik from "storybook-formik";
import TextAreaField from "../../app/components/UI/TextAreaField";
import type { TextAreaFieldProps } from "../../app/components/UI/TextAreaField";
import * as Yup from "yup";
const FormSchema = Yup.object().shape({
  description: Yup.string()
    .min(2)
    .max(20)
    .required(
      "Field may not be less than 2 letters or include numeric values/symbols."
    ),
});

const meta: Meta = {
  decorators: [withFormik],
  title: "UI/TextAreaField",
  component: TextAreaField,
  parameters: {
    formik: {
      initialValues: {
        description: "",
      },
      validationSchema: FormSchema,
      onSubmit: (v: { description: string }) =>
        console.log("I want to log these... ", v),
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

const Template: ComponentStory<FC<TextAreaFieldProps>> = (args) => (
  <TextAreaField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  className: "",
  help: "Include any specific comments on what should be improved, added, etc.",
  label: "Feedback Detail",
  name: "description",
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  className: "",
  help: "Include any specific comments on what should be improved, added, etc.",
  label: "Feedback Detail",
  name: "description",
  errors: ["Feedback Detail should be less than 350 characters"],
};
