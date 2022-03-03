import { useMemo, useState } from 'react';
import { json, useLoaderData, useOutletContext } from 'remix';
import { auth } from '~/auth.server';
import FeedbacksList from '~/components/FeedbacksList';
import FeedbacksListHeader from '~/components/FeedbacksListHeader';
import { db, getFeedbacksWithCounts } from '~/utils/db.server';

import type { LoaderFunction, ActionFunction } from "remix";
import type { User } from "@prisma/client";
import type { FeedbacksWithCounts } from "~/utils/db.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    feedbackId: string | undefined;
    upvote: boolean | undefined;
  };
  fields?: {
    feedbackId: string;
    upvote: boolean;
  };
  message?: string;
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  // const userId = await requireUserId(request);
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  console.log("user", user);
  const form = await request.formData();
  let shouldUpvote = form.get("upvote") === "true";
  let feedbackId = form.get("feedbackId") as string;
  console.log("feedbackId", feedbackId);
  console.log("shouldUpvote", shouldUpvote);

  if (!feedbackId) {
    return badRequest({
      message: "problem",
    });
  }
  if (shouldUpvote) {
    await db.feedback.update({
      where: { id: feedbackId },
      data: {
        upvotes: {
          connect: { id: user.id },
        },
      },
    });
  } else {
    await db.feedback.update({
      where: { id: feedbackId },
      data: {
        upvotes: {
          disconnect: { id: user.id },
        },
      },
    });
  }
  return json({
    message: "success",
  });
};

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
