import {
  ActionFunction,
  json,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";

import { auth } from "./auth.server";
import Footer from "./components/Footer";
import styles from "./tailwind.css";

import type { MetaFunction } from "remix";
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await auth.isAuthenticated(request);
  if (user && !(user instanceof Error)) {
    return json({ user }); // redirect to user's profile
  }
  return json({ user: null });
};

export const action: ActionFunction = async ({ request }) => {
  await auth.logout(request, { redirectTo: "/login" });
};

export default function App() {
  const { user } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body id="root">
        <Outlet context={{ user }} />
        <Footer user={user} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
