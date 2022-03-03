import { json, Outlet, redirect, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { auth } from '~/auth.server';
import { AddCommentForm, CommentsList, Feedback } from '~/components';
import { ButtonLink, GoBackLink } from '~/components/UI';
import { createComment, getAllCommentsForFeedbackId } from '~/models/comment';
import { addUpvoteToFeedback, deleteFeedback, getFeedbackBySlug, removeUpvoteFromFeedback } from '~/models/feedback';
import { parseStringFormData } from '~/utils/http';

import type { LoaderFunction, ActionFunction } from "remix";
import type { User, FeedbackComments, FeedbackWithCounts } from "~/types";

export const action: ActionFunction = async ({ request, params }) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(params.slug);
  const feedback = await getFeedbackBySlug(params.slug);
  invariant(feedback, "Feedback not found");

  const data = await parseStringFormData(request);
  invariant(data._action, "action is required");

  switch (data._action) {
    case "ADD_COMMENT": {
      const parentId = data.parentId || undefined;
      invariant(data.content, "content is required");
      let newComment = null;
      if (parentId) {
        newComment = await createComment({
          userId: user.id,
          feedbackId: feedback.id,
          content: data.content,
          parentId: parentId,
        });
      } else {
        newComment = await createComment({
          userId: user.id,
          feedbackId: feedback.id,
          content: data.content,
        });
      }
      return newComment;
    }
    case "UPVOTE": {
      const shouldUpvote = data.upvote === "true";
      if (shouldUpvote) {
        await addUpvoteToFeedback(feedback.id, user.id);
      } else {
        await removeUpvoteFromFeedback(feedback.id, user.id);
      }
      return json({
        message: "success",
      });
    }
    case "DELETE": {
      await deleteFeedback(feedback.id);
      return redirect("/");
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
  const comments = await getAllCommentsForFeedbackId(feedback.id);

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
        <AddCommentForm />
      </main>
    </div>
  );
}
