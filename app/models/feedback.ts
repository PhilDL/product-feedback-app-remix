import { db } from './db.server';

export async function getFeedbacksWithCounts(
  sort: string,
  categorySlug?: string | null
) {
  let orderBy = {} as any;
  let where = {} as any;
  if (!sort || sort === "most-upvotes") {
    orderBy = {
      upvotes: {
        _count: "desc",
      },
    };
  }
  if (sort === "least-upvotes") {
    orderBy = {
      upvotes: {
        _count: "asc",
      },
    };
  }
  if (sort === "most-comments") {
    orderBy = {
      comments: {
        _count: "desc",
      },
    };
  }
  if (sort === "least-comments") {
    orderBy = {
      comments: {
        _count: "asc",
      },
    };
  }

  if (categorySlug) {
    where = {
      category: {
        slug: categorySlug,
      },
    };
  }

  const feedbacks = await db.feedback.findMany({
    include: {
      _count: {
        select: { comments: true, upvotes: true },
      },
      user: true,
      category: true,
      upvotes: {
        select: { id: true },
      },
    },
    orderBy: orderBy,
    where: where,
  });
  return feedbacks;
}

export const getFeedbacksWithCountsAndStatus = async () => {
  const feedbacks = await db.feedback.findMany({
    include: {
      _count: {
        select: { comments: true, upvotes: true },
      },
      user: true,
      category: true,
      upvotes: {
        select: { id: true },
      },
    },
    where: {
      status: { in: ["planned", "in-progress", "live"] },
    },
  });
  return feedbacks;
};

export const getFeedbackBySlug = async (slug: string) => {
  return db.feedback.findUnique({
    where: {
      slug: slug,
    },
    include: {
      _count: {
        select: { comments: true, upvotes: true },
      },
      user: true,
      category: true,
      upvotes: {
        select: { id: true },
      },
    },
  });
};

export const getFeedbackStatuses = async () => {
  const feedbackStatuses = [
    { name: "Planned", key: "planned", count: 0, color: "#F49F85" },
    { name: "In-Progress", key: "in-progress", count: 0, color: "#AD1FEA" },
    { name: "Live", key: "live", count: 0, color: "#62BCFA" },
  ];
  const feedbacks = await db.feedback.findMany({
    where: {
      status: {
        in: ["planned", "in-progress", "live"],
      },
    },
  });
  if (feedbacks) {
    for (const feedback of feedbacks) {
      const { status } = feedback;
      const statusIndex = feedbackStatuses.findIndex(
        (statusItem) => statusItem.key === status
      );
      if (statusIndex !== -1) {
        feedbackStatuses[statusIndex].count++;
      }
    }
  }
  return feedbackStatuses;
};

export const createFeedback = async ({
  title,
  slug,
  categoryId,
  description,
  userId,
}: {
  title: string;
  slug: string;
  categoryId: string;
  description: string;
  userId: string;
}) => {
  return db.feedback.create({
    data: {
      title,
      slug,
      categoryId,
      description,
      userId: userId,
    },
  });
};

export const updateFeedbackWithSlug = (
  slug: string,
  {
    title,
    slug: newSlug,
    categoryId,
    description,
    status,
  }: {
    title?: string;
    slug?: string;
    categoryId?: string;
    description?: string;
    status?: string;
  }
) => {
  return db.feedback.update({
    where: {
      slug: slug,
    },
    data: {
      title,
      slug: newSlug,
      categoryId,
      description,
      status,
    },
  });
};

export const addUpvoteToFeedback = async (
  feedbackId: string,
  userId: string
) => {
  return db.feedback.update({
    where: { id: feedbackId },
    data: {
      upvotes: {
        connect: { id: userId },
      },
    },
  });
};

export const removeUpvoteFromFeedback = async (
  feedbackId: string,
  userId: string
) => {
  return db.feedback.update({
    where: { id: feedbackId },
    data: {
      upvotes: {
        disconnect: { id: userId },
      },
    },
  });
};

export const deleteFeedback = async (feedbackId: string) => {
  const deleteUpvotes = db.feedback.update({
    data: {
      upvotes: {
        set: [],
      },
    },
    where: {
      id: feedbackId,
    },
  });
  const deleteFeedback = db.feedback.delete({
    where: {
      id: feedbackId,
    },
  });

  return await db.$transaction([deleteUpvotes, deleteFeedback]);
};
