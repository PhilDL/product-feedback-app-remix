import { db } from "./db.server";

export const getAllCategories = async () => {
  return db.category.findMany();
};

export const getAllCategoriesWithCount = async () => {
  return db.category.findMany({
    include: {
      _count: {
        select: { feedbacks: true },
      },
      feedbacks: true,
    },
  });
};

export const getCategoryBySlug = async (slug: string) => {
  return db.category.findUnique({
    where: {
      slug: slug,
    },
  });
};

export const getCategoryWithFeedbacksBySlug = async (slug: string) => {
  return db.category.findUnique({
    include: {
      _count: {
        select: { feedbacks: true },
      },
      feedbacks: true,
    },
    where: {
      slug: slug,
    },
  });
};

export const deleteCategory = async (id: string) => {
  return db.category.delete({
    where: {
      id: id,
    },
  });
};

export const createCategory = async (name: string, slug: string) => {
  return db.category.create({
    data: {
      name,
      slug,
    },
  });
};

export const updateCategory = async (
  name: string,
  slug: string,
  id: string
) => {
  return db.category.update({
    data: {
      name,
      slug,
    },
    where: {
      id: id,
    },
  });
};
