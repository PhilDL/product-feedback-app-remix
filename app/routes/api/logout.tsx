import { ActionFunction } from "remix";
import { auth } from "~/auth.server";

export let action: ActionFunction = async ({ request }) => {
  await auth.logout(request, { redirectTo: "/login" });
};
