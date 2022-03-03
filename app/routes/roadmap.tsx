import React from 'react';
import { useLoaderData, useOutletContext } from 'remix';
import { RoadmapFeedbacksList } from '~/components';
import { ButtonLink, GoBackLink } from '~/components/UI';
import { getFeedbacksWithCountsAndStatus } from '~/models/feedback';

import type { LoaderFunction } from "remix";
import type { User, FeedbackStatusAggregate } from "~/types";

export type LoaderData = {
  feedbackStatuses: FeedbackStatusAggregate[];
};

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let sort = url.searchParams.get("sort");
  if (!sort) {
    sort = "most-upvotes";
  }
  const feedbacks = await getFeedbacksWithCountsAndStatus();
  const feedbackStatuses: FeedbackStatusAggregate[] = [
    {
      name: "Planned",
      key: "planned",
      count: 0,
      color: "#F49F85",
      feedbacks: [],
      description: "Ideas prioritized for research",
    },
    {
      name: "In-Progress",
      key: "in-progress",
      count: 0,
      color: "#AD1FEA",
      feedbacks: [],
      description: "Currently being developed",
    },
    {
      name: "Live",
      key: "live",
      count: 0,
      color: "#62BCFA",
      feedbacks: [],
      description: "Released features",
    },
  ];
  if (feedbacks) {
    for (const feedback of feedbacks) {
      const { status } = feedback;
      const statusIndex = feedbackStatuses.findIndex(
        (statusItem) => statusItem.key === status
      );
      if (statusIndex !== -1) {
        feedbackStatuses[statusIndex].count++;
        feedbackStatuses[statusIndex].feedbacks.push(feedback);
      }
    }
  }
  const data: LoaderData = {
    feedbackStatuses: feedbackStatuses,
  };
  return data;
};

export default function Index() {
  const { feedbackStatuses } = useLoaderData<LoaderData>();
  const { user } = useOutletContext<{ user: User }>();
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );

  return (
    <div className="flex flex-col min-h-screen container mx-auto sm:gap-7">
      <nav className="flex flex-row gap-4 sm:rounded py-6 px-8 justify-between items-center bg-blue-dark text-white">
        <div>
          <GoBackLink theme="dark" />
          <h1 className="text-xl sm:text-2xl font-bold">Roadmap</h1>
        </div>
        <ButtonLink to="/new-feedback" role="primary" className="ml-auto">
          + Add Feedback
        </ButtonLink>
      </nav>
      <nav className="flex gap-4 px-6 justify-between border-b-2 border-b-gray-500/20 mb-6 sm:hidden">
        {feedbackStatuses.map((feedbackStatus) => (
          <button
            key={`link-feedback-status-${feedbackStatus.key}`}
            onClick={() => setSelectedStatus(feedbackStatus.key)}
            className={`text-gray-700 text-sm font-bold pt-6 pb-4 w-full ${
              feedbackStatus.key === selectedStatus
                ? "border-b-fushia border-b-4"
                : "border-b-transparent border-b-4 opacity-40"
            }`}
          >
            {feedbackStatus.name} ({feedbackStatus.count})
          </button>
        ))}
      </nav>
      <main className="flex w-full gap-7 flex-col px-6 sm:flex-row sm:px-0">
        {feedbackStatuses.map((feedbackStatus) => (
          <div key={feedbackStatus.key} className="flex-1">
            {(selectedStatus === null ||
              selectedStatus === feedbackStatus.key) && (
              <>
                <h2 className="text-gray-700 font-bold text-lg">
                  {feedbackStatus.name} ({feedbackStatus.count})
                </h2>
                <p className="text-gray-500 mb-6">
                  {feedbackStatus.description}
                </p>

                <RoadmapFeedbacksList
                  feedbacks={feedbackStatus.feedbacks || []}
                  statusColor={feedbackStatus.color}
                  statusName={feedbackStatus.name}
                  user={user}
                />
              </>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
