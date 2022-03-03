import { useLoaderData, useOutletContext } from 'remix';
import invariant from 'tiny-invariant';
import FeedbacksList from '~/components/FeedbacksList';
import FeedbacksListHeader from '~/components/FeedbacksListHeader';
import { getFeedbacksWithCounts } from '~/utils/db.server';

import type { LoaderFunction } from "remix";
import type { User } from "@prisma/client";
import type { FeedbacksWithCounts } from "~/utils/db.server";

export type LoaderData = {
  feedbacks: FeedbacksWithCounts;
  categorySlug: string;
};

export const handle = { id: "feedback-category-show" };

export let loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.categorySlug);
  const url = new URL(request.url);
  let sort = url.searchParams.get("sort");
  if (!sort) {
    sort = "most-upvotes";
  }
  const data: LoaderData = {
    feedbacks: await getFeedbacksWithCounts(sort, params.categorySlug),
    categorySlug: params.categorySlug,
  };
  return data;
};

export default function CategoryIndex() {
  const { feedbacks } = useLoaderData<LoaderData>();
  const { user } = useOutletContext<{ user: User }>();

  return (
    <main className="flex flex-col w-full gap-7">
      <FeedbacksListHeader feedbackCount={feedbacks?.length || 0} />
      <FeedbacksList feedbacks={feedbacks || []} user={user} />
    </main>
  );
}
