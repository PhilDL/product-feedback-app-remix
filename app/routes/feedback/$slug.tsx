import { GoBackLink, ButtonLink } from "~/components/UI";
import { Feedback, CommentsList, AddCommentForm } from "~/components";
import {
  db,
  getFeedbackBySlug,
  getAllFeedbackComments,
  FeedbackComments,
} from "~/utils/db.server";
import { useLoaderData, Outlet, json } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import type { User } from "@prisma/client";
import type { FeedbackWithCounts } from "~/utils/db.server";
import { auth } from "~/auth.server";
import invariant from "tiny-invariant";
import { parseStringFormData } from "~/utils/http";

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
  const data = await parseStringFormData(request);
  console.log(data);
  invariant(data._action, "action is required");

  switch (data._action) {
    case "ADD_COMMENT": {
      const feedbackId = data.feedbackId;
      const parentId = data.parentId || undefined;
      invariant(data.content, "content is required");
      let newComment = null;
      if (parentId) {
        newComment = await db.comment.create({
          data: {
            author: {
              connect: { id: user.id },
            },
            parent: {
              connect: { id: parentId },
            },
            feedback: {
              connect: { id: feedbackId },
            },
            content: data.content,
          },
        });
      } else {
        newComment = await db.comment.create({
          data: {
            author: {
              connect: { id: user.id },
            },
            content: data.content,
            feedback: {
              connect: { id: feedbackId },
            },
          },
        });
      }
      return newComment;
    }
    case "UPVOTE": {
      const shouldUpvote = data.upvote === "true";
      if (shouldUpvote) {
        await db.feedback.update({
          where: { id: data.feedbackId },
          data: {
            upvotes: {
              connect: { id: user.id },
            },
          },
        });
      } else {
        await db.feedback.update({
          where: { id: data.feedbackId },
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
    }
  }
};

export type LoaderData = {
  feedback: FeedbackWithCounts;
  comments: FeedbackComments;
  user: User | null;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.slug);
  const feedback = await getFeedbackBySlug(params.slug);
  invariant(feedback, "feedback not found");
  const comments = await getAllFeedbackComments(feedback.id);

  const data: LoaderData = {
    feedback: (await getFeedbackBySlug(params.slug)) as FeedbackWithCounts,
    user: await auth.isAuthenticated(request),
    comments: comments,
  };
  return data;
};

export default function Index() {
  const { feedback, user, comments } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col min-h-screen py-2 px-6 md:px-0 container mx-auto gap-7 max-w-3xl justify-center">
      <header className="flex justify-between mt-6">
        <GoBackLink to="/" />
        <ButtonLink to={`/feedback/${feedback.slug}/edit`} role="secondary">
          Edit Feedback
        </ButtonLink>
      </header>
      <main className="flex flex-col w-full gap-7">
        <Feedback feedback={feedback} withHeading={true} user={user} />
        <Outlet />
        <CommentsList
          comments={comments || []}
          totalComments={comments?.length || 0}
        />
        <AddCommentForm feedbackId={feedback.id} />
      </main>
    </div>
  );
}
