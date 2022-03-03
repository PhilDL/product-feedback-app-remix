import { db } from './db.server';

export const getAllCommentsForFeedbackId = async (feedbackId: string) => {
  return db.comment.findMany({
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
};

export const createComment = async ({
  userId,
  feedbackId,
  content,
  parentId = undefined,
}: {
  userId: string;
  feedbackId: string;
  content: string;
  parentId?: string;
}) => {
  let data: {
    author: {
      connect: {
        id: any;
      };
    };
    parent?: {
      connect: {
        id: string | undefined;
      };
    };
    feedback: {
      connect: {
        id: any;
      };
    };
    content: string;
  } = {
    author: {
      connect: { id: userId },
    },
    feedback: {
      connect: { id: feedbackId },
    },
    content: content,
  };
  if (parentId) {
    data.parent = {
      connect: { id: parentId },
    };
  }
  return db.comment.create({
    data: data,
  });
};
