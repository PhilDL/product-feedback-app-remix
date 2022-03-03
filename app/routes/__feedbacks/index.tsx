import { useState, useMemo } from "react";
import ApplicationLogo from "../../components/UI/ApplicationLogo";
import FeedbacksListHeader from "../../components/FeedbacksListHeader";
import FeedbacksList from "../../components/FeedbacksList";
import RoadmapMenu from "../../components/RoadmapMenu";
import TagsCloud from "../../components/TagsCloud";
import MobileMenu from "../../components/MobileMenu";
import { db, getFeedbacksWithCounts } from "~/utils/db.server";
import {
  useLoaderData,
  useTransition,
  useActionData,
  redirect,
  Form,
  json,
  Outlet,
  Link,
  useOutletContext,
} from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import type { Category, Feedback, User } from "@prisma/client";
import type { FeedbacksWithCounts } from "~/utils/db.server";
import { auth } from "~/auth.server";
import invariant from "tiny-invariant";

// export type LoaderData = {
//   categories: Array<Category>;
//   feedbacks: FeedbacksWithCounts;
//   user: User | null;
// };

// export let loader: LoaderFunction = async ({ request }) => {
//   const data: LoaderData = {
//     categories: await db.category.findMany(),
//     feedbacks: await getFeedbacksWithCounts(),
//     user: await auth.isAuthenticated(request),
//   };
//   return data;
// };

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
