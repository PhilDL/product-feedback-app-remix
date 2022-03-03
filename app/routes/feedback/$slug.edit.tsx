import { withYup } from '@remix-validated-form/with-yup';
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from 'remix';
import { ValidatedForm, validationError } from 'remix-validated-form';
import invariant from 'tiny-invariant';
import * as Yup from 'yup';
import { auth } from '~/auth.server';
import { Button, ButtonLink, Card, GoBackLink, SelectField, TextAreaField, TextField } from '~/components/UI';
import { db, getFeedbackBySlug, slugify } from '~/utils/db.server';

import type { Category, User } from "@prisma/client";
import type { FeedbackWithCounts } from "~/utils/db.server";

export type FeedbackStatus = {
  id: string;
  name: string;
};

export type LoaderData = {
  categories: Array<Category>;
  user: User | null;
  feedback: FeedbackWithCounts;
  statuses: FeedbackStatus[];
};

export const validator = withYup(
  Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string()
      .required("Required")
      .min(3, "Must be at least 60 characters"),
  })
);

export const action: ActionFunction = async ({ request, params }) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(params.slug);
  if (user.role !== "ADMIN") {
    return redirect(`/feedback/${params.slug}`);
  }
  const form = await request.formData();
  const result = await validator.validate(form);
  if (result.error) return validationError(result.error);
  const { title, categoryId, description, status } = result.data;
  const slug = slugify(title);
  await db.feedback.update({
    where: {
      slug: params.slug,
    },
    data: {
      title,
      slug,
      categoryId,
      description,
      status,
    },
  });
  return redirect(`/feedback/${slug}`);
};

export let loader: LoaderFunction = async ({ request, params }) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(params.slug);
  if (user.role !== "ADMIN") {
    return redirect(`/feedback/${params.slug}`);
  }
  const feedback = await getFeedbackBySlug(params.slug);
  const statuses = [
    { name: "Planned", id: "planned" },
    { name: "In-Progress", id: "in-progress" },
    { name: "Live", id: "live" },
  ];
  invariant(feedback, "feedback not found");
  const data: LoaderData = {
    categories: await db.category.findMany(),
    feedback: feedback,
    user: user,
    statuses: statuses,
  };
  return data;
};

const NewFeedback = () => {
  const { categories, statuses, feedback } = useLoaderData<LoaderData>();

  return (
    <div className="flex min-h-screen py-7 px-6 md:px-0 container mx-auto max-w-xl">
      <main className="flex flex-col w-full gap-7 justify-around">
        <header className="py-7">
          <GoBackLink />
        </header>
        <Card className="flex-col gap-3 relative">
          <svg
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-7"
          >
            <defs>
              <radialGradient
                cx="103.9%"
                cy="-10.387%"
                fx="103.9%"
                fy="-10.387%"
                r="166.816%"
                id="a"
              >
                <stop stopColor="#E84D70" offset="0%" />
                <stop stopColor="#A337F6" offset="53.089%" />
                <stop stopColor="#28A7ED" offset="100%" />
              </radialGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <circle fill="url(#a)" cx="20" cy="20" r="20" />
              <path
                d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </g>
          </svg>
          <h1 className="text-xl text-gray-700 font-bold mt-8">
            Editing ‘{feedback.title}’
          </h1>
          <ValidatedForm
            validator={validator}
            method="post"
            className="flex flex-col gap-6"
          >
            <TextField
              label="Feedback Title"
              help="Add a short, descriptive headline"
              name="title"
              required={true}
              defaultValue={feedback.title}
            />
            <SelectField
              label="Category"
              inputName="categoryId"
              name="categoryId"
              help="Choose a category for your feedback"
              options={categories}
              defaultValue={feedback.category.id}
              required={true}
              form="newFeedback"
            />
            <SelectField
              label="Update Status"
              inputName="status"
              name="status"
              help="Change feedback state"
              options={statuses}
              defaultValue={feedback.status || "planned"}
              required={true}
              form="newFeedback"
            />
            <TextAreaField
              name="description"
              label="Feedback Detail"
              help="Include any specific comments on what should be improved, added, etc."
              defaultValue={feedback.description}
            />

            <div className="flex justify-between flex-col md:flex-row-reverse gap-3 text-center md:text-left md:gap-0">
              <div className="flex flex-col gap-3 md:justify-between md:flex-row-reverse">
                <Button type="submit" role="primary">
                  Edit Feedback
                </Button>

                <ButtonLink to={`/feedback/${feedback.slug}`} role="default">
                  Cancel
                </ButtonLink>
              </div>

              <Button name="delete" role="danger">
                Delete
              </Button>
            </div>
          </ValidatedForm>
        </Card>
      </main>
    </div>
  );
};

export default NewFeedback;
