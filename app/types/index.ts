import { Prisma } from '@prisma/client';
import { getAllCommentsForFeedbackId } from '~/models/comment';
import { getFeedbackBySlug, getFeedbackStatuses, getFeedbacksWithCounts } from '~/models/feedback';

import type {
  Category as PrismaCategory,
  Feedback as PrismaFeedback,
  User as PrismaUser,
} from "@prisma/client";

export type Category = PrismaCategory;
export type Feedback = PrismaFeedback;
export type User = PrismaUser;

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type FeedbacksWithCounts = ThenArg<
  ReturnType<typeof getFeedbacksWithCounts>
>;

export type FeedbackWithCountsOrNull = ThenArg<
  ReturnType<typeof getFeedbackBySlug>
>;

export type FeedbackComments = ThenArg<
  ReturnType<typeof getAllCommentsForFeedbackId>
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

export type FeedbackStatuses = ThenArg<ReturnType<typeof getFeedbackStatuses>>;

export interface FeedbackStatusAggregate {
  name: string;
  key: string;
  count: number;
  color: string;
  feedbacks: FeedbacksWithCounts;
  description: string;
}
