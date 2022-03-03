import { db } from './db.server';

export const findUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email: email },
  });
};

export const findUserByUsername = async (username: string) => {
  return db.user.findUnique({
    where: { username: username },
  });
};

export const createUser = async ({
  email,
  avatarUrl,
  fullName,
  username,
  passwordHash,
}: {
  email: string;
  avatarUrl?: string;
  fullName: string;
  username: string;
  passwordHash: string;
}) => {
  return db.user.create({
    data: { email, avatarUrl, fullName, username, passwordHash },
  });
};
