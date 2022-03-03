import { db } from './db.server';

export const getAllCategories = async () => {
  return db.category.findMany();
};
