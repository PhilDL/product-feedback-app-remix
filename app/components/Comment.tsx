import React, { useState } from "react";
import type { CommentModel } from "../types/models";
import Image from "next/image";
import Button from "./UI/Button";
import UnstyledButton from "./UI/UnstyledButton";
import CommentReply from "./CommentReply";

export type CommentProps = {
  comment: CommentModel;
  onAddComment: () => void;
};

const Comment: React.FC<CommentProps> = ({
  comment,
  onAddComment,
}: CommentProps) => {
  const { user, content, replying_to_user: replyingTo, replies } = comment;
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);

  const closeReplayAndPropagate = () => {
    setShowReplyBox(false);
    onAddComment();
  };

  return (
    <section className="feedback-comment w-full">
      <div
        className={`relative ${replyingTo && "ml-10"} ${
          replies && replies.length > 0 && "with-replies"
        }`}
      >
        <div
          className={`flex flex-row gap-5 ${
            replyingTo ? "my-3" : "my-8"
          } justify-between items-start text-gray-500 font-normal`}
        >
          <div className="-ml-5 absolute">
            <Image
              src={user?.avatar_url || ""}
              alt={`Avatar of ${user.username}`}
              width={40}
              height={40}
              className="rounded-full w-10 absolute"
              layout="fixed"
            />
          </div>
          <div className="flex flex-col w-full pl-10">
            <div className="flex justify-between">
              <div>
                <h4 className="text-gray-700 text-sm font-bold tracking-tight">
                  {user.full_name}
                </h4>
                <span className="text-sm">@{user.username}</span>
              </div>
              <UnstyledButton onClick={() => setShowReplyBox((show) => !show)}>
                Reply
              </UnstyledButton>
            </div>
            <p className="mt-2 max-w-prose">
              {replyingTo && (
                <span className="font-bold text-fushia mr-3">
                  @{replyingTo.username}
                </span>
              )}
              {content}
            </p>
            {showReplyBox && (
              <CommentReply
                comment={comment}
                onAddComment={closeReplayAndPropagate}
              />
            )}
          </div>
        </div>
        {replies && replies.length > 0 && (
          <div className="bg-white flex flex-col justify-between items-start">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onAddComment={onAddComment}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default Comment;
