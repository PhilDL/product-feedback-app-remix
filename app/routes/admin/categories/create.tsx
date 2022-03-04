import { withYup } from "@remix-validated-form/with-yup";
import { createCategory, getCategoryBySlug } from "~/models/category";
import { ValidatedForm, validationError } from "remix-validated-form";
import * as Yup from "yup";
import { auth } from "~/auth.server";
import { Button, ButtonLink, Card, TextField } from "~/components/UI";
import { slugify } from "~/utils";
import { json } from "remix";

import type { ActionFunction } from "remix";

export const validator = withYup(
  Yup.object().shape({
    name: Yup.string().min(2, "At least 2 characters").required("Required"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const result = await validator.validate(formData);
  if (result.error) {
    return validationError(result.error, result.submittedData);
  }
  const { name } = result.data;
  const slug = slugify(name);
  const alreadyExists = await getCategoryBySlug(slug);
  if (alreadyExists) {
    return validationError(
      { fieldErrors: { name: "This category/slug already exists" } },
      result.submittedData
    );
  }
  const newCategory = await createCategory(
    result.data.name,
    slugify(result.data.name)
  );
  return json({ newCategory: newCategory });
};

export default function AdminCategoriesCreate() {
  return (
    <Card className="flex-col gap-3 relative h-full">
      <h1 className="text-xl text-gray-700 font-bold">New Category</h1>
      <ValidatedForm
        validator={validator}
        method="post"
        resetAfterSubmit={true}
      >
        <TextField label="Name" name="name" help="Name of the category" />
        <div className="flex justify-between items-center gap-6 flex-col sm:flex-row-reverse mt-6">
          <Button type="submit" role="primary" className="w-full sm:w-auto">
            Create
          </Button>
          <ButtonLink
            role="default"
            to="/admin/categories"
            className="w-full sm:w-auto"
          >
            Cancel
          </ButtonLink>
        </div>
      </ValidatedForm>
    </Card>
  );
}
