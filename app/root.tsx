import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LoaderFunction,
  json,
  useLoaderData,
  ActionFunction,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";
import { auth } from "./auth.server";
import Footer from "./components/Footer";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap",
    },
  ];
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
      <body>
        <Outlet context={{ user }} />
        <Footer user={user} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
