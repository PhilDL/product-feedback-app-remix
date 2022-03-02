import { Prisma, PrismaClient } from "@prisma/client";

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

export async function getFeedbacksWithCounts() {
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
  });
  return feedbacks;
}

// Extract `UsersWithPosts` type with
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type FeedbacksWithCounts = ThenArg<
  ReturnType<typeof getFeedbacksWithCounts>
>;

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

// 3: This type will include a user and all their posts
export type FeedbackWithCounts = Prisma.FeedbackGetPayload<
  typeof feedbacksWithCounts
>;
