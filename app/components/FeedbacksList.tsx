import React from "react";
import Feedback from "./Feedback";
import NoFeedback from "./NoFeedback";
import type { FeedbacksWithCounts } from "~/utils/db.server";
import type { User } from "@prisma/client";

export type FeedbacksListProps = {
  feedbacks: FeedbacksWithCounts;
  upvoteCallBack?: (
    feedbackSlug: string,
    feedbackId: string,
    oldUpvoteState: boolean
  ) => void;
  user?: User | null;
};

const FeedbacksList: React.FC<FeedbacksListProps> = ({
  feedbacks,
  upvoteCallBack = () => {},
  user,
}: FeedbacksListProps) => {
  if (feedbacks.length === 0) {
    return <NoFeedback />;
  }
  return (
    <div className="flex flex-col gap-4 px-6 sm:px-0">
      {feedbacks.map((feedback) => (
        <Feedback
          key={feedback.id}
          feedback={feedback}
          user={user}
          upvoteCallBack={upvoteCallBack}
        />
      ))}
    </div>
  );
};
export default FeedbacksList;
