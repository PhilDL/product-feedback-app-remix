import { Form, Link, Outlet, useLoaderData } from "remix";
import { AdminDataTable } from "~/components";
import { Breadcrumb, UnstyledButton } from "~/components/UI";
import { getAllUsersWithCounts } from "~/models/user";

import type { UserWithCounts } from "~/types";
import type { LoaderFunction } from "remix";
export type LoaderData = {
  users: UserWithCounts[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    users: await getAllUsersWithCounts(),
  };
  return data;
};

export const handle = {
  breadcrumb: () => (
    <Breadcrumb>
      <Link
        to="/admin/users"
        className="ml-1 text-md font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
      >
        Categories
      </Link>
    </Breadcrumb>
  ),
  title: "Users",
};

const CategoriesIndex = () => {
  const { users } = useLoaderData<LoaderData>();
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <AdminDataTable
          datas={users}
          fields={[
            {
              name: "Name",
              render: (user: UserWithCounts) => (
                <Form method="get" action={`/admin/users/${user.username}`}>
                  <UnstyledButton type="submit" role="secondary">
                    {user.fullName}
                  </UnstyledButton>
                </Form>
              ),
              key: "fullName",
            },
            {
              name: "Username",
              render: (user: UserWithCounts) => user.username,
              key: "username",
            },
            {
              name: "Email",
              render: (user: UserWithCounts) => user.email,
              key: "email",
            },
            {
              name: "Role",
              render: (user: UserWithCounts) => user.role,
              key: "role",
            },
            {
              name: "# Feedbacks",
              render: (user: UserWithCounts) => user._count.feedbacks,
              key: "_count.feedbacks",
            },
          ]}
          editButtons={(user: UserWithCounts) => (
            <Form method="get" action={`/admin/users/${user.username}/edit`}>
              <UnstyledButton type="submit" role="default">
                Edit
              </UnstyledButton>
            </Form>
          )}
          deleteButtons={(user: UserWithCounts) => (
            <Form method="post" action={`/admin/users/${user.username}`}>
              <input type="hidden" name="_action" value={"DELETE"} />
              <UnstyledButton type="submit" role="danger">
                Delete
              </UnstyledButton>
            </Form>
          )}
        />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default CategoriesIndex;
