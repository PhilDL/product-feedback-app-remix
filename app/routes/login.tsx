import type { ActionFunction, LoaderFunction } from "remix";
import { Card, GoBackLink, TextField, Button } from "../components/UI";
import { Link, json, useLoaderData } from "remix";
import { auth, sessionStorage } from "~/auth.server";
import { ValidatedForm, validationError } from "remix-validated-form";
import { withYup } from "@remix-validated-form/with-yup";
import * as Yup from "yup";

export const validator = withYup(
  Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  })
);

type LoaderData = {
  error: { message: string } | null;
};

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const result = await validator.validate(formData);
  if (result.error) {
    return validationError(result.error, result.submittedData);
  }

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

export default function Screen() {
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
            Sign-In with password
          </h1>
          <ValidatedForm validator={validator} method="post">
            {error && <div className="text-red">{error.message}</div>}

            <TextField label="Email" name="email" help="Email used to signin" />
            <TextField
              label="Password"
              name="password"
              type="password"
              help="Password used to signin"
            />
            <div className="flex justify-between items-center gap-6 flex-col sm:flex-row-reverse mt-6">
              <Button type="submit" role="primary" className="w-full sm:w-auto">
                Sign in
              </Button>
              <Link
                to="/register"
                className="text-fushia cursor-pointer hover:text-fushia-light"
              >
                Or signup to create an account
              </Link>
            </div>
          </ValidatedForm>
        </Card>
      </main>
    </div>
  );
}
