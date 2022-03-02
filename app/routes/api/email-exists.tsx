import type { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";
import { json } from "remix";

type LoaderData = {
  valid?: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let email = url.searchParams.get("email");
  const user = await db.user.findUnique({
    where: { email: email as string },
  });
  if (user) {
    return json<LoaderData>({
      valid: false,
    });
  }
  return json<LoaderData>({ valid: true });
};
