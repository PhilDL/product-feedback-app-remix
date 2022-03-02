import React from "react";
import Feedback from "./Feedback";
import NoFeedback from "./NoFeedback";
import type { FeedbacksWithCounts } from "~/utils/db.server";
import type { User } from "@prisma/client";

export type FeedbacksListProps = {
  feedbacks: FeedbacksWithCounts;
  user?: User | null;
};

const FeedbacksList: React.FC<FeedbacksListProps> = ({
  feedbacks,
  user,
}: FeedbacksListProps) => {
  if (feedbacks.length === 0) {
    return <NoFeedback />;
  }
  return (
    <div className="flex flex-col gap-4 px-6 sm:px-0">
      {feedbacks.map((feedback) => (
        <Feedback key={feedback.id} feedback={feedback} user={user} />
      ))}
    </div>
  );
};
export default FeedbacksList;
