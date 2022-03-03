import FeedbacksListHeader from "~/components/FeedbacksListHeader";
import FeedbacksList from "~/components/FeedbacksList";
import { db, getFeedbacksWithCounts } from "~/utils/db.server";
import { useLoaderData, useOutletContext, json } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import type { User } from "@prisma/client";
import type { FeedbacksWithCounts } from "~/utils/db.server";
import { auth } from "~/auth.server";
import invariant from "tiny-invariant";

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

export const handle = { id: "feedback-category-show" };

export const action: ActionFunction = async ({ request }) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const form = await request.formData();
  let shouldUpvote = form.get("upvote") === "true";
  let feedbackId = form.get("feedbackId") as string;

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
  categorySlug: string;
};

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
