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

export const getFeedbackBySlug = (slug: string) => {
  const feedback = db.feedback.findUnique({
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
  return feedback;
};

export const getAllFeedbackComments = async (feedbackId: string) => {
  const comments = db.comment.findMany({
    where: {
      feedback: {
        id: feedbackId,
      },
    },
    include: {
      author: true,
      parent: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
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

/**
 * Slugify a string
 * @param args Input string to slugify
 * @returns Slugified string, correct for URL consumption
 */
export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(" ");

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};
