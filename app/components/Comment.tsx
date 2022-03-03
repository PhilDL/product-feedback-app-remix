import React, { useState } from 'react';
import CommentReply from '~/components/CommentReply';
import UnstyledButton from '~/components/UI/UnstyledButton';

import type { CommentWithReplies } from "~/types";

export type CommentProps = {
  comment: CommentWithReplies;
};

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  const { author, content, parent, parentId, replies } = comment;
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);

  return (
    <section className="feedback-comment w-full">
      <div
        className={`relative ${parentId && "ml-10"} ${
          replies && replies.length > 0 && "with-replies"
        }`}
      >
        <div
          className={`flex flex-row gap-5 ${
            parentId ? "my-3" : "my-8"
          } justify-between items-start text-gray-500 font-normal`}
        >
          <div className="-ml-5 absolute w-10">
            <img
              src={author?.avatarUrl || ""}
              alt={`Avatar of ${author.username}`}
              width={40}
              height={40}
              className="rounded-full w-10 absolute"
            />
          </div>
          <div className="flex flex-col w-full pl-10">
            <div className="flex justify-between">
              <div>
                <h4 className="text-gray-700 text-sm font-bold tracking-tight">
                  {author.fullName}
                </h4>
                <span className="text-sm">@{author.username}</span>
              </div>
              <UnstyledButton onClick={() => setShowReplyBox((show) => !show)}>
                Reply
              </UnstyledButton>
            </div>
            <p className="mt-2 max-w-prose">
              {parent && (
                <span className="font-bold text-fushia mr-3">
                  @{parent?.author?.username || ""}
                </span>
              )}
              {content}
            </p>
            {showReplyBox && (
              <CommentReply
                comment={comment}
                onSubmit={() => setShowReplyBox(false)}
              />
            )}
          </div>
        </div>
        {replies && replies.length > 0 && (
          <div className="bg-white flex flex-col justify-between items-start">
            {replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default Comment;
