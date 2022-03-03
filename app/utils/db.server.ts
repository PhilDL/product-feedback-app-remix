import { Prisma, PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
  db.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  db = global.__db;
}

export { db };

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

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type FeedbacksWithCounts = ThenArg<
  ReturnType<typeof getFeedbacksWithCounts>
>;

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

export type FeedbackWithCountsOrNull = ThenArg<
  ReturnType<typeof getFeedbackBySlug>
>;

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
export type FeedbackComments = ThenArg<
  ReturnType<typeof getAllFeedbackComments>
>;

const commentWithAuthorAndParent = Prisma.validator<Prisma.CommentArgs>()({
  include: {
    author: true,
    parent: {
      include: {
        author: true,
      },
    },
  },
});
export type FeedbackComment = Prisma.CommentGetPayload<
  typeof commentWithAuthorAndParent
>;

export type CommentWithReplies = FeedbackComment & {
  replies: CommentWithReplies[];
};

const feedbacksWithCounts = Prisma.validator<Prisma.FeedbackArgs>()({
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
export type FeedbackWithCounts = Prisma.FeedbackGetPayload<
  typeof feedbacksWithCounts
>;

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

export type FeedbackStatuses = ThenArg<ReturnType<typeof getFeedbackStatuses>>;

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
