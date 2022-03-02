import React from "react";
import RoadmapFeedback from "./RoadmapFeedback";
import type { FeedbackModel } from "../types/models";

type RoadmapFeedbacksListProps = {
  feedbacks: FeedbackModel[];
  upvoteCallBack?: (
    feedbackSlug: string,
    feedbackId: number,
    oldUpvoteState: boolean
  ) => void;
  statusColor: string;
  statusName: string;
};

const RoadmapFeedbacksList: React.FC<RoadmapFeedbacksListProps> = ({
  feedbacks,
  upvoteCallBack = () => {},
  statusColor,
  statusName,
}) => {
  if (feedbacks.length === 0) {
    return <p>No Feedbacks</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {feedbacks.map((feedback) => (
        <RoadmapFeedback
          key={feedback.id}
          feedback={feedback}
          upvoteCallBack={upvoteCallBack}
          statusColor={statusColor}
          statusName={statusName}
        />
      ))}
    </div>
  );
};
export default RoadmapFeedbacksList;
