import { withYup } from '@remix-validated-form/with-yup';
import bcrypt from 'bcryptjs';
import { json, Link, useLoaderData } from 'remix';
import { ValidatedForm, validationError } from 'remix-validated-form';
import * as Yup from 'yup';
import { auth, sessionStorage } from '~/auth.server';
import { AsyncValidatedTextField, Button, Card, GoBackLink, TextField } from '~/components/UI';
import { db } from '~/utils/db.server';

import type { ActionFunction, LoaderFunction } from "remix";

export const validator = withYup(
  Yup.object().shape({
    fullName: Yup.string()
      .required("Required")
      .min(4, "Full Name must be at least 4 characters")
      .max(50, "Full Name must be less than 50 characters"),
    username: Yup.string()
      .required("Required")
      .min(4, "Username must be at least 4 characters")
      .matches(/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric, and '_' only")
      .max(20, "Username must be less than 20 characters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(4, "Password must be at least 4 characters"),
    avatarUrl: Yup.string().url("Must be a valid URL"),
  })
);

type LoaderData = {
  error: { message: string } | null;
};

export const action: ActionFunction = async ({ request }) => {
  console.log("problematic");
  const form = await request.formData();
  const result = await validator.validate(form);
  if (result.error) return validationError(result.error);
  let { username, email, password, fullName, avatarUrl } = result.data;
  const usernameExists = await db.user.findUnique({
    where: { username },
  });
  if (usernameExists) {
    return validationError(
      {
        fieldErrors: {
          username: "This username is already taken",
        },
      },
      result.data
    );
  }
  const emailExists = await db.user.findUnique({
    where: { email },
  });
  if (emailExists) {
    return validationError(
      {
        fieldErrors: {
          username: "This username is already taken",
        },
      },
      result.data
    );
  }
  if (!avatarUrl) {
    avatarUrl = `https://avatars.dicebear.com/api/bottts/${username}.svg`;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { email, avatarUrl, fullName, username, passwordHash },
  });
  await auth.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await auth.isAuthenticated(request, { successRedirect: "/" });
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const error = session.get(auth.sessionErrorKey) as LoaderData["error"];
  return json<LoaderData>({ error });
};

const Register = () => {
  const { error } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col min-h-screen px-6 md:px-0 py-7 container mx-auto max-w-xl justify-center gap-10">
      <header>
        <GoBackLink />
      </header>
      <main className="flex flex-col w-full gap-7">
        <Card className="flex-col gap-3 relative">
          <svg
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-5"
          >
            <defs>
              <radialGradient
                cx="103.9%"
                cy="-10.387%"
                fx="103.9%"
                fy="-10.387%"
                r="166.816%"
                id="a"
              >
                <stop stopColor="#E84D70" offset="0%" />
                <stop stopColor="#A337F6" offset="53.089%" />
                <stop stopColor="#28A7ED" offset="100%" />
              </radialGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <circle fill="url(#a)" cx="20" cy="20" r="20" />
              <path
                d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </g>
          </svg>
          <h1 className="text-xl text-gray-700 font-bold mt-8">
            Create an account
          </h1>
          <ValidatedForm validator={validator} method="post">
            <div>
              <TextField
                label="Name"
                name="fullName"
                help="Enter your full name, shown in comments"
                required={true}
              />
              <TextField
                label="Avatar Url"
                name="avatarUrl"
                help="Optional url of your avatar image"
                required={false}
              />
              <AsyncValidatedTextField
                label="Username"
                name="username"
                help="Choose a unique username."
                apiURI="/api/username-exists"
                loadingMsg="Checking..."
                invalidMsg="Username already taken"
                validMsg="Username available"
              />
              <AsyncValidatedTextField
                label="Email"
                name="email"
                help="Enter a valid e-mail"
                apiURI="/api/email-exists"
                loadingMsg="Checking..."
                invalidMsg="This email is already registered"
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                help="Choose a strong password."
                required={true}
              />
              <div className="flex justify-between items-center flex-col sm:flex-row-reverse gap-6 mt-6 sm:mt-3">
                <Button
                  type="submit"
                  role="primary"
                  className="w-full sm:w-auto"
                >
                  Sign in
                </Button>
                <Link
                  to="/login"
                  className="text-fushia cursor-pointer hover:text-fushia-light"
                >
                  Already have an account ?
                </Link>
              </div>
            </div>
          </ValidatedForm>
        </Card>
      </main>
    </div>
  );
};

export default Register;
