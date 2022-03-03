import React from 'react';
import { Link } from 'remix';

import Card from './UI/Card';
import Tag from './UI/Tag';
import Upvote from './UI/Upvote';

import type { User } from "@prisma/client";
import type { FeedbackWithCounts } from "~/utils/db.server";

export type FeedbackProps = {
  feedback: FeedbackWithCounts;
  withHeading?: boolean;
  user?: User | null;
};

const Feedback: React.FC<FeedbackProps> = ({
  feedback,
  withHeading = false,
  user,
}: FeedbackProps) => {
  // const upvoted = useUpvotedState(feedback);
  const upvoted =
    user !== undefined &&
    user !== null &&
    feedback.upvotes.findIndex((user) => user.id === user.id) !== -1;
  const commentsCount = feedback._count.comments;

  return (
    <Card className="md:flex-row flex-col gap-10 justify-between items-start">
      <div className="md:flex md:flex-1 hidden">
        <Upvote
          active={upvoted}
          count={feedback._count.upvotes}
          feedbackId={feedback.id}
        />
      </div>
      <div className="flex flex-col w-full">
        <Link to={`/feedback/${feedback.slug}`}>
          {withHeading ? (
            <h1 className="text-gray-700 text-lg font-bold mb-1 hover:text-blue">
              {feedback.title}
            </h1>
          ) : (
            <h3 className="text-gray-700 text-lg font-bold mb-1 hover:text-blue">
              {feedback.title}
            </h3>
          )}

          <p className="text-gray-500 font-normal">{feedback.description}</p>
        </Link>
        <div className="mt-4">
          <Tag slug={feedback.category.slug}>{feedback.category.name}</Tag>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full md:w-auto md:self-center md:flex-1">
        <div className="md:hidden">
          <Upvote
            active={upvoted}
            count={feedback._count.upvotes}
            inlineStyle={true}
            feedbackId={feedback.id}
          />
        </div>
        <span className="flex flex-row gap-3 items-center">
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
              fill="#CDD2EE"
              fillRule="nonzero"
            />
          </svg>
          <span
            className={`${
              commentsCount > 0 ? "text-gray-700" : "text-gray-700/50"
            } font-bold`}
          >
            {commentsCount || 0}
          </span>
        </span>
      </div>
    </Card>
  );
};
export default Feedback;
