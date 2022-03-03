import { json } from 'remix';
import { auth } from '~/auth.server';
import { db } from '~/utils/db.server';

import type { ActionFunction } from "remix";

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

export const action: ActionFunction = async ({ params, request }) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const form = await request.formData();
  const shouldUpvote = form.get("upvote") === "true";
  const feedbackId = params.feedbackId;

  if (!feedbackId) {
    return badRequest({
      message: "problem",
    });
  }
  if (shouldUpvote) {
    return await db.feedback.update({
      where: { id: feedbackId },
      data: {
        upvotes: {
          connect: { id: user.id },
        },
      },
    });
  } else {
    return await db.feedback.update({
      where: { id: feedbackId },
      data: {
        upvotes: {
          disconnect: { id: user.id },
        },
      },
    });
  }
};
