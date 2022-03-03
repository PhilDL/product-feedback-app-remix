import { json } from 'remix';
import { findUserByEmail } from '~/models/user';

import type { LoaderFunction } from "remix";

type LoaderData = {
  valid?: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let email = url.searchParams.get("email");
  const user = await findUserByEmail(email as string);
  if (user) {
    return json<LoaderData>({
      valid: false,
    });
  }
  return json<LoaderData>({ valid: true });
};
