import { json } from 'remix';
import { findUserByUsername } from '~/models/user';

import type { LoaderFunction } from "remix";
type LoaderData = {
  valid?: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let username = url.searchParams.get("username");
  const user = await findUserByUsername(username as string);
  if (user) {
    return json<LoaderData>({
      valid: false,
    });
  }
  return json<LoaderData>({ valid: true });
};
