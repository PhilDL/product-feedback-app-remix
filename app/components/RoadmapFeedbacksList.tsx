import React from 'react';

import RoadmapFeedback from './RoadmapFeedback';

import type { FeedbacksWithCounts } from "~/utils/db.server";
import type { User } from "~/types";

type RoadmapFeedbacksListProps = {
  feedbacks: FeedbacksWithCounts;
  statusColor: string;
  statusName: string;
  user?: User | null;
};

const RoadmapFeedbacksList: React.FC<RoadmapFeedbacksListProps> = ({
  feedbacks,
  statusColor,
  statusName,
  user,
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
          statusColor={statusColor}
          statusName={statusName}
          user={user}
        />
      ))}
    </div>
  );
};
export default RoadmapFeedbacksList;
