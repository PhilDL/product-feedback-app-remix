import { withYup } from "@remix-validated-form/with-yup";
import bcrypt from "bcryptjs";
import { json, Link, redirect, useCatch, useMatches } from "remix";
import { unauthorized } from "remix-utils";
import { ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import * as Yup from "yup";
import { appSettings, setAppConfigured } from "~/app-config.server";
import { auth } from "~/auth.server";
import {
  ApplicationLogo,
  Button,
  ButtonLink,
  Card,
  TextField,
} from "~/components/UI";
import { createAdminUser } from "~/models/user";

import type { LoaderFunction, ActionFunction } from "remix";

export const action: ActionFunction = async ({ request, params }) => {
  const { appConfigured, appId } = await appSettings();
  if (appConfigured) {
    return redirect("/admin");
  }
  invariant(params.appId);
  if (params.appId !== appId) {
    throw unauthorized({ message: "Unauthorized: Wrong AppID" });
  }
  const clonedRequest = request.clone();
  const form = await request.formData();
  const result = await validator.validate(form);
  if (result.error) return validationError(result.error);
  let { username, email, password, fullName, avatarUrl } = result.data;
  if (!avatarUrl) {
    avatarUrl = `https://avatars.dicebear.com/api/bottts/${username}.svg`;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const adminUser = await createAdminUser({
    email,
    avatarUrl,
    fullName,
    username,
    passwordHash,
  });
  if (!adminUser || adminUser.role !== "ADMIN") {
    throw Error("An Error occured while creating the Admin user !");
  }
  setAppConfigured();
  await auth.authenticate("form", clonedRequest, {
    successRedirect: "/admin",
    failureRedirect: "/login",
  });
};

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

export const loader: LoaderFunction = async ({ request, params }) => {
  const { appConfigured, appId } = await appSettings();
  if (appConfigured) {
    return redirect("/admin");
  }
  invariant(params.appId);
  if (params.appId !== appId) {
    throw unauthorized({ message: "Unauthorized: Wrong AppID" });
  }
  return json({});
};

export const handle = {
  breadcrumb: () => (
    <span className="inline-flex items-center text-md font-medium text-gray-700 hover:text-black">
      <svg
        className="mr-2 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
      </svg>
      First configuration
    </span>
  ),
  title: "First Configuration",
};

const ConfigurationPanel = () => {
  const matches = useMatches();
  console.log("matches", matches);
  let title = "Admin panel";
  let actionButtons = null;
  const matchesWithHandleTitles = matches.filter(
    (match) => match.handle && match.handle.title
  );
  if (matchesWithHandleTitles.length > 0) {
    title =
      matchesWithHandleTitles[matchesWithHandleTitles.length - 1].handle.title;
  }
  const matchesWithHandleActionButtons = matches.filter(
    (match) => match.handle && match.handle.actionButtons
  );
  if (matchesWithHandleActionButtons.length > 0) {
    actionButtons =
      matchesWithHandleActionButtons[matchesWithHandleActionButtons.length - 1]
        .handle.actionButtons;
  }
  return (
    <div className="flex min-h-screen ">
      <nav className="flex flex-col gap-3 w-1/5 text-gray-700 bg-white ">
        <ApplicationLogo
          mobileMenuVisible={false}
          onMobileMenuClick={() => null}
          onMobileMenuCloseClick={() => null}
          className="sm:py-2 min-h-32 flex-1"
          rounded={false}
          subTitle="Admin Panel"
        />
        <ul className="h-full p-6 font-bold gap-3 flex flex-col"></ul>
        <ul className="h-full p-6 gap-3 flex flex-col flex-1 text-blue font-normal">
          <li>
            <Link to="/">&lt; Back to Website</Link>
          </li>
        </ul>
      </nav>
      <div className="w-full">
        <header className="h-32 border-b-2 border-gray-500/10 p-6 bg-white relative">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              {matches
                // skip routes that don't have a breadcrumb
                .filter((match) => match.handle && match.handle.breadcrumb)
                .map((match, index) => (
                  <li className="inline-flex items-center" key={index}>
                    {match.handle.breadcrumb(match)}
                  </li>
                ))}
            </ol>
          </nav>
          <div className="flex justify-between items-baseline">
            <h1 className="mt-3 text-3xl text-gray-700 font-bold">{title}</h1>
            {actionButtons && (
              <div className="flex justify-between">{actionButtons}</div>
            )}
          </div>
        </header>
        <main className="flex flex-col min-h-screen px-6 md:px-0 py-7 container mx-auto max-w-xl justify-center gap-10">
          <Card className="flex-col gap-3 relative">
            <h2 className="text-xl text-gray-700 font-bold">
              Create the Admin User
            </h2>
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
                <TextField
                  label="Username"
                  name="username"
                  help="Choose a unique username."
                  required={true}
                />
                <TextField
                  label="Email"
                  name="email"
                  help="Enter a valid e-mail"
                  required={true}
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
                    Create
                  </Button>
                </div>
              </div>
            </ValidatedForm>
          </Card>
        </main>
      </div>
    </div>
  );
};

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <main className="w-full min-h-screen max-w-3xl mx-auto flex items-center justify-center">
      <Card className="flex-col gap-7 w-full">
        <h1 className="text-3xl text-gray-700 font-bold">
          Error {caught.status}
        </h1>
        <p className="text-gray-500">
          You ended up in place you shouldn't be !
        </p>
        <div className="flex justify-between">
          <ButtonLink to="/" role="primary">
            Go Home
          </ButtonLink>
        </div>
      </Card>
    </main>
  );
}

export default ConfigurationPanel;
