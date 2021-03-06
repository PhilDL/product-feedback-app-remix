import bcrypt from 'bcryptjs';
import { createCookieSessionStorage } from 'remix';
import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { db } from '~/models/db.server';

import type { User } from "~/types";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret"], // This should be an env variable
    secure: process.env.NODE_ENV === "production",
  },
});

export const auth = new Authenticator<User>(sessionStorage);

auth.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email) throw new AuthorizationError("Email is required");
    if (!password) throw new AuthorizationError("Password is required");

    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new AuthorizationError("Email not found");
    const isValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isValid) {
      throw new AuthorizationError("Invalid credentials");
    }
    return user;
  })
);
