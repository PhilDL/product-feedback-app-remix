import { Form, redirect, useLoaderData, json } from "remix";
import invariant from "tiny-invariant";
import { auth } from "~/auth.server";
import { BasicLink, Button, Card } from "~/components/UI";
import {
  deleteCategory,
  getCategoryWithFeedbacksBySlug,
} from "~/models/category";
import { parseStringFormData } from "~/utils/http";

import type { LoaderFunction, ActionFunction } from "remix";
import type { CategoryWithCounts } from "~/types";

export const action: ActionFunction = async ({ request, params }) => {
  await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(params.slug);
  const category = await getCategoryWithFeedbacksBySlug(params.slug);
  invariant(category, "Category not found");

  const data = await parseStringFormData(request);
  invariant(data._action, "action is required");

  switch (data._action) {
    case "DELETE": {
      await deleteCategory(category.id);
      return redirect("/admin/categories");
    }
  }
};

export const handle = {
  breadcrumb: (match: any) => (
    <div className="flex items-center">
      <svg
        className="w-6 h-6 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="ml-1 text-md font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
        {match?.data?.name}
      </span>
    </div>
  ),
};

export let loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.slug);
  const category = await getCategoryWithFeedbacksBySlug(params.slug);
  invariant(category, "Category not found");

  return json(category);
};

export default function CategorySlug() {
  const category = useLoaderData<CategoryWithCounts>();

  return (
    <Card className="flex-col gap-2 relative h-full justify-start">
      <header className="flex-1">
        <h2 className="text-3xl text-gray-700 font-bold">
          Category {category.name}
        </h2>
      </header>
      <main className="h-full py-7">
        <div>
          <h3 className="inline-block text-xl text-gray-700 font-bold">
            Public URL:{" "}
          </h3>
          <BasicLink to={`/category/${category.slug}`}>
            category/{category.slug}
          </BasicLink>
        </div>
        {category._count.feedbacks > 0 && (
          <div>
            <h3 className="inline-block text-xl text-gray-700 font-bold mb-3">
              {category._count.feedbacks} Feedback
              {category._count.feedbacks > 1 ? "s" : ""}
            </h3>

            <ul className="flex flex-col gap-3">
              {category.feedbacks.map((feedback) => (
                <li key={feedback.id}>{feedback.title}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="flex flex-1 justify-start items-center flex-col sm:flex-row-reverse gap-3">
        <input type="hidden" name="_action" value={"UPDATE"} />
        <Form method="get" action={`/admin/categories/${category.slug}/edit`}>
          <Button type="submit" role="default">
            Edit
          </Button>
        </Form>
        <Form method="post" action={`/admin/categories/${category.slug}`}>
          <input type="hidden" name="_action" value={"DELETE"} />
          <Button type="submit" role="danger">
            Delete
          </Button>
        </Form>
      </footer>
    </Card>
  );
}
