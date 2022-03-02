import type { ActionFunction } from "remix";
import { db } from "~/utils/db.server";
import { json } from "remix";
import { auth } from "~/auth.server";

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
  console.log("TEST user", user);
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
  return json({
    message: "success",
  });
};
