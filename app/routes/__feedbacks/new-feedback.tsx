import { withYup } from '@remix-validated-form/with-yup';
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from 'remix';
import { ValidatedForm, validationError } from 'remix-validated-form';
import * as Yup from 'yup';
import { auth } from '~/auth.server';
import { Button, ButtonLink, Card, GoBackLink, SelectField, TextAreaField, TextField } from '~/components/UI';
import { db, slugify } from '~/utils/db.server';

import type { Category } from "@prisma/client";

export const validator = withYup(
  Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string()
      .required("Required")
      .min(3, "Must be at least 60 characters"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const form = await request.formData();
  const result = await validator.validate(form);
  if (result.error) return validationError(result.error);
  const { title, categoryId, description } = result.data;
  const slug = slugify(title);
  const newFeedback = await db.feedback.create({
    data: {
      title,
      slug,
      categoryId,
      description,
      userId: user.id,
    },
  });
  return redirect("/");
};

export type LoaderData = {
  categories: Array<Category>;
};

export let loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    categories: await db.category.findMany(),
  };
  return data;
};

const NewFeedback = () => {
  const { categories } = useLoaderData<LoaderData>();

  return (
    <div className="flex min-h-screen py-7 px-6 md:px-0 container mx-auto max-w-xl">
      <header>
        <GoBackLink />
      </header>
      <main className="flex flex-col w-full gap-7">
        <Card className="flex-col gap-3 relative">
          <svg
            width="56"
            height="56"
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
              <circle fill="url(#a)" cx="28" cy="28" r="28" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
              />
            </g>
          </svg>
          <h1 className="text-xl text-gray-700 font-bold mt-8">
            Create New Feedback
          </h1>
          <ValidatedForm validator={validator} method="post">
            <div>
              <TextField
                label="Feedback Title"
                help="Add a short, descriptive headline"
                name="title"
                required={true}
              />
              <SelectField
                label="Category"
                inputName="categoryId"
                name="categoryId"
                help="Choose a category for your feedback"
                options={categories}
                defaultValue={categories[0].id}
                required={true}
                form="newFeedback"
              />
              <TextAreaField
                name="description"
                label="Feedback Detail"
                help="Include any specific comments on what should be improved, added, etc."
              />

              <div className="flex justify-between flex-col md:flex-row-reverse gap-3 text-center md:text-left md:gap-0">
                <Button type="submit" role="primary">
                  Add Feedback
                </Button>

                <ButtonLink to="/" role="default">
                  Cancel
                </ButtonLink>
              </div>
            </div>
          </ValidatedForm>
        </Card>
      </main>
    </div>
  );
};

export default NewFeedback;
