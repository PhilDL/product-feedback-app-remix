import React, { useState } from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import TextAreaField from "./UI/TextAreaField";
import { Form } from "remix";
import { ValidatedForm, validationError } from "remix-validated-form";
import { withYup } from "@remix-validated-form/with-yup";
import * as Yup from "yup";

export type AddCommentFormProps = {
  feedbackId: string | number;
  replyToCommentId?: string | number;
};

export const addCommentFormValidator = withYup(
  Yup.object().shape({
    content: Yup.string()
      .required("Required")
      .max(250, "Must be at max 250 characters"),
    feedbackId: Yup.string().required("Required"),
  })
);

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  feedbackId,
}: AddCommentFormProps) => {
  const [error, setError] = useState<string | null>(null);
  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={addCommentFormValidator}
        className="flex flex-col gap-6 w-full"
      >
        {error && <div className="text-red">{error}</div>}
        <input type="hidden" value={feedbackId} name="feedbackId" />
        <input type="hidden" name="_action" value={"ADD_COMMENT"} />
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
            {250} characters left
          </span>
          <Button role="primary" type="submit">
            Post comment
          </Button>
        </div>
      </ValidatedForm>
    </Card>
  );
};
export default AddCommentForm;
