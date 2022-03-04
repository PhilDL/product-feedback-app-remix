import { Form, Link, Outlet, useLoaderData } from "remix";
import { UnstyledButton, Button, Breadcrumb } from "~/components/UI";

import { AdminDataTable } from "~/components";
import { getAllCategoriesWithCount } from "~/models/category";

import type { CategoryWithCounts } from "~/types";
import type { LoaderFunction } from "remix";
export type LoaderData = {
  categories: CategoryWithCounts[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    categories: await getAllCategoriesWithCount(),
  };
  return data;
};

export const handle = {
  breadcrumb: () => (
    <Breadcrumb>
      <Link
        to="/admin/categories"
        className="ml-1 text-md font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
      >
        Categories
      </Link>
    </Breadcrumb>
  ),
  title: "Categories",
  actionButtons: (
    <Form method="get" action="/admin/categories/create">
      <Button role="primary">+ Add Category</Button>
    </Form>
  ),
};

const CategoriesIndex = () => {
  const { categories } = useLoaderData<LoaderData>();
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <AdminDataTable
          datas={categories}
          fields={[
            {
              name: "Name",
              render: (category: CategoryWithCounts) => (
                <Form
                  method="get"
                  action={`/admin/categories/${category.slug}`}
                >
                  <UnstyledButton type="submit" role="secondary">
                    {category.name}
                  </UnstyledButton>
                </Form>
              ),
              key: "name",
            },
            {
              name: "Slug",
              render: (category: CategoryWithCounts) => category.slug,
              key: "slug",
            },
            {
              name: "# Feedbacks",
              render: (category: CategoryWithCounts) =>
                category._count.feedbacks,
              key: "_count.feedbacks",
            },
          ]}
          editButtons={(category: CategoryWithCounts) => (
            <Form
              method="get"
              action={`/admin/categories/${category.slug}/edit`}
            >
              <UnstyledButton type="submit" role="default">
                Edit
              </UnstyledButton>
            </Form>
          )}
          deleteButtons={(category: CategoryWithCounts) => (
            <Form method="post" action={`/admin/categories/${category.slug}`}>
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
