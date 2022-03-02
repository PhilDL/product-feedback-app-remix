import React from "react";
import Comment from "./Comment";
import type { CommentModel } from "../types/models";
import { arrayToTree } from "performant-array-to-tree";

export type CommentsListProps = {
  comments?: CommentModel[];
  totalComments: number;
  onAddComment: () => void;
};

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  totalComments,
  onAddComment,
}: CommentsListProps) => {
  const commentsTree: CommentModel[] = comments
    ? (arrayToTree(comments, {
        dataField: null,
        childrenField: "replies",
        parentId: "parent_id",
      }) as CommentModel[])
    : [];

  return (
    <div className="bg-white px-12 py-6 rounded">
      <h2 className="text-gray-700 font-bold text-lg -ml-5">
        {totalComments} Comments
      </h2>
      {comments && comments.length > 0 && (
        <div className="divide-y flex flex-col divide-gray-100">
          {commentsTree.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onAddComment={onAddComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default CommentsList;
