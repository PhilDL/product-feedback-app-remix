import React, { useState } from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import TextAreaField from "./UI/TextAreaField";
import { createComment } from "../lib/client";
import { useUser } from "../utils/useUser";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";

export type AddCommentFormProps = {
  feedbackId: string | number;
  replyToCommentId?: string | number;
  onAddComment: () => void;
};

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  feedbackId,
  replyToCommentId,
  onAddComment,
}: AddCommentFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const submitHandler = async (
    values: { content: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    if (!user) {
      setError("You must be logged in to comment");
      return;
    }
    setSubmitting(true);
    const { data: newComment, error } = await createComment({
      user_id: user.id,
      content: values.content,
      feedback_id: +feedbackId,
    });
    if (error) {
      setError(error.message);
      return;
    } else {
      setError(null);
    }
    setSubmitting(false);
    onAddComment();
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .required("Required")
        .max(250, "Must be at max 250 characters"),
    }),
    onSubmit: submitHandler,
  });
  return (
    <Card>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6 w-full">
          {error && <div className="text-red">{error}</div>}
          <input type="hidden" value={feedbackId} name="feedbackId" />
          <input
            type="hidden"
            value={replyToCommentId}
            name="replyToCommentId"
          />
          <TextAreaField
            name="content"
            label="Add Comment"
            placeholder="Type your comment here"
            rows={3}
            labelSize="text-lg"
            maxLength="250"
            required={true}
          />
          <div className="flex justify-between items-center">
            <span className="font-normal text-sm text-gray-500">
              {250 - formik.values.content.length} characters left
            </span>
            <Button role="primary" type="submit">
              Post comment
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </Card>
  );
};
export default AddCommentForm;
