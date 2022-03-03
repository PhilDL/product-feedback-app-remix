import { withYup } from '@remix-validated-form/with-yup';
import React, { useState } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import * as Yup from 'yup';
import { Button, Card, TextAreaField } from '~/components/UI';

export const addCommentFormValidator = withYup(
  Yup.object().shape({
    content: Yup.string()
      .required("Required")
      .max(250, "Must be at max 250 characters"),
  })
);

const AddCommentForm: React.FC = () => {
  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={addCommentFormValidator}
        className="flex flex-col gap-6 w-full"
      >
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
