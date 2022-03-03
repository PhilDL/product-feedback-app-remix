import React from 'react';
import { useLoaderData, useOutletContext } from 'remix';
import { auth } from '~/auth.server';
import FeedbacksList from '~/components/FeedbacksList';
import FeedbacksListHeader from '~/components/FeedbacksListHeader';
import { getFeedbacksWithCounts } from '~/models/feedback';

import type { LoaderFunction } from "remix";
import type { User, FeedbacksWithCounts } from "~/types";

export type LoaderData = {
  feedbacks: FeedbacksWithCounts;
  user: User | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let sort = url.searchParams.get("sort");
  if (!sort) {
    sort = "most-upvotes";
  }
  console.log("Index.tsx sort", sort);
  const data: LoaderData = {
    feedbacks: await getFeedbacksWithCounts(sort),
    user: await auth.isAuthenticated(request),
  };
  return data;
};

export default function Index() {
  const { feedbacks } = useLoaderData<LoaderData>();
  const { user } = useOutletContext<{ user: User }>();

  return (
    <main className="flex flex-col w-full gap-7">
      <FeedbacksListHeader feedbackCount={feedbacks?.length || 0} />
      <FeedbacksList feedbacks={feedbacks || []} user={user} />
    </main>
  );
}
