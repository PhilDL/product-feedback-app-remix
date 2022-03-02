import React, { useState } from "react";
import type { CommentModel } from "../types/models";
import { createComment } from "../lib/client";
import Button from "./UI/Button";
import ButtonLink from "./UI/ButtonLink";
import TextAreaField from "./UI/TextAreaField";
import { Link } from "remix";
import { useUser } from "../utils/useUser";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  comment: CommentModel;
  onAddComment: () => void;
};

const CommentReply: React.FC<Props> = ({ comment, onAddComment }: Props) => {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
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
      feedback_id: comment.feedback_id,
      parent_id: comment.id,
      replying_to: comment.user.id,
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
    <FormikProvider value={formik}>
      <Form className="flex mt-6 justify-between gap-1 sm:gap-6 sm:items-start items-end flex-col sm:flex-row">
        {error && <div className="text-red">{error}</div>}
        <TextAreaField
          name="content"
          rows={4}
          className="py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input w-full"
        />
        {user ? (
          <Button type="submit" role="primary" className="whitespace-nowrap">
            Post Reply
          </Button>
        ) : (
          <Link to="/signin">
            <ButtonLink role="primary" className="whitespace-nowrap">
              Sign-in
            </ButtonLink>
          </Link>
        )}
      </Form>
    </FormikProvider>
  );
};
export default CommentReply;
