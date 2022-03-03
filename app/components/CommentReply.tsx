import React, { useEffect, useRef } from 'react';
import { Form, useTransition } from 'remix';

import Button from './UI/Button';

import type { CommentWithReplies } from "~/utils/db.server";

type Props = {
  comment: CommentWithReplies;
  onSubmit: () => void;
};

const CommentReply: React.FC<Props> = ({ comment, onSubmit }: Props) => {
  const transition = useTransition();
  let isAdding =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "ADD_COMMENT";
  console.log(transition.state);

  const formRef = useRef<HTMLFormElement>(null!);

  useEffect(() => {
    if (isAdding) {
      formRef.current?.reset();
      onSubmit();
    }
  }, [isAdding]);

  return (
    <Form
      method="post"
      ref={formRef}
      className="flex mt-6 justify-between gap-1 sm:gap-6 sm:items-start items-end flex-col sm:flex-row"
    >
      <label htmlFor="content" className="sr-only">
        Reply to {comment.author.fullName}
      </label>
      <input type="hidden" value={comment.id} name="parentId" />
      <input type="hidden" name="_action" value={"ADD_COMMENT"} />
      <textarea
        className={`py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input w-full`}
        rows={4}
        name="content"
      />
      <Button type="submit" role="primary" className="whitespace-nowrap">
        Post Reply
      </Button>
    </Form>
  );
};
export default CommentReply;
