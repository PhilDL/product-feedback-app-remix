import React from "react";
import Comment from "./Comment";
import type { FeedbackComments, CommentWithReplies } from "~/utils/db.server";
import { arrayToTree } from "performant-array-to-tree";

export type CommentsListProps = {
  comments?: FeedbackComments;
  totalComments: number;
};

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  totalComments,
}: CommentsListProps) => {
  const commentsTree = comments
    ? (arrayToTree(comments, {
        dataField: null,
        childrenField: "replies",
        // parentId: "parent_id",
      }) as CommentWithReplies[])
    : [];

  return (
    <div className="bg-white px-12 py-6 rounded">
      <h2 className="text-gray-700 font-bold text-lg -ml-5">
        {totalComments} Comments
      </h2>
      {comments && comments.length > 0 && (
        <div className="divide-y flex flex-col divide-gray-100">
          {commentsTree.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
export default CommentsList;
