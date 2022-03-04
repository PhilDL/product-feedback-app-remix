import { Link, Outlet, useCatch, useMatches } from "remix";
import { unauthorized } from "remix-utils";
import { auth } from "~/auth.server";
import { ApplicationLogo, ButtonLink, Card } from "~/components/UI";

import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  console.log("user:", user);
  if (user.role !== "ADMIN") {
    throw unauthorized({ message: "Unauthorized" });
  }
  return {};
};

export const handle = {
  breadcrumb: () => (
    <Link
      to="/admin"
      className="inline-flex items-center text-md font-medium text-gray-700 hover:text-black"
    >
      <svg
        className="mr-2 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
      </svg>
      Admin Panel
    </Link>
  ),
  title: "Admin panel",
};

const AdminPanel = () => {
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
  console.log("actionsButtons", actionButtons);
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
        <ul className="h-full p-6 font-bold gap-3 flex flex-col">
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/posts">Posts</Link>
          </li>
          <li>
            <Link to="/admin/categories">Categories</Link>
          </li>
        </ul>
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
        <main className="p-6">
          <Outlet />
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

export default AdminPanel;
