import { useState, useMemo } from "react";
import ApplicationLogo from "../components/UI/ApplicationLogo";
import FeedbacksListHeader from "../components/FeedbacksListHeader";
import FeedbacksList from "../components/FeedbacksList";
import RoadmapMenu from "../components/RoadmapMenu";
import TagsCloud from "../components/TagsCloud";
import MobileMenu from "../components/MobileMenu";
import { db, getFeedbacksWithCounts } from "~/utils/db.server";
import {
  useLoaderData,
  useTransition,
  useActionData,
  redirect,
  Form,
  json,
  Outlet,
  Link,
} from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import type { Category, Feedback, User } from "@prisma/client";
import type { FeedbacksWithCounts } from "~/utils/db.server";
import { auth } from "~/auth.server";

export type LoaderData = {
  categories: Array<Category>;
  feedbacks: FeedbacksWithCounts;
  user: User | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    categories: await db.category.findMany(),
    feedbacks: await getFeedbacksWithCounts(),
    user: await auth.isAuthenticated(request),
  };
  return data;
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    feedbackId: string | undefined;
    upvote: boolean | undefined;
  };
  fields?: {
    feedbackId: string;
    upvote: boolean;
  };
  message?: string;
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  // const userId = await requireUserId(request);
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  console.log("user", user);
  const form = await request.formData();
  let shouldUpvote = form.get("upvote") === "true";
  let feedbackId = form.get("feedbackId") as string;
  console.log("feedbackId", feedbackId);
  console.log("shouldUpvote", shouldUpvote);

  if (!feedbackId) {
    return badRequest({
      message: "problem",
    });
  }
  if (shouldUpvote) {
    await db.feedback.update({
      where: { id: feedbackId },
      data: {
        upvotes: {
          connect: { id: user.id },
        },
      },
    });
  } else {
    await db.feedback.update({
      where: { id: feedbackId },
      data: {
        upvotes: {
          disconnect: { id: user.id },
        },
      },
    });
  }
  return json({
    message: "success",
  });
  // const name = form.get("name");
  // const content = form.get("content");
  // // we do this type check to be extra sure and to make TypeScript happy
  // // we'll explore validation next!
  // if (typeof name !== "string" || typeof content !== "string") {
  //   return badRequest({
  //     formError: "Form not submitted correctly",
  //   });
  // }
  // const fieldErrors = {
  //   name: validateRecipeName(name),
  //   content: validateRecipeContent(content),
  // };
  // const fields = { name, content };
  // if (Object.values(fieldErrors).some(Boolean)) {
  //   return badRequest({
  //     fieldErrors,
  //     fields,
  //   });
  // }
  // const recipe = await db.recipe.create({
  //   data: { ...fields, userId: userId },
  // });
  // return redirect(`/recipes/${recipe.id}`);
};

export interface FeedbackModel extends Feedback {
  _count: { comments: number; upvotes: number };
  user: User;
  category: Category;
}
export default function Suggestions() {
  const { categories, feedbacks, user } = useLoaderData<LoaderData>();
  console.log("feedbacks", feedbacks);
  const [feedbacksSort, setFeedbacksSort] = useState<string>("most-upvotes");
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  // const { onChangeUpvoteHandler } = useUpvoteChange();
  const onChangeUpvoteHandler = () => {
    console.log("test");
  };

  const sortedFeedbacks = useMemo(() => {
    let sortedFeedbacks: FeedbacksWithCounts = feedbacks || [];
    if (selectedCategoryId !== null) {
      sortedFeedbacks = sortedFeedbacks.filter(
        (feedback) => feedback.categoryId === selectedCategoryId
      );
    }
    switch (feedbacksSort) {
      case "most-upvotes":
        return sortedFeedbacks?.sort(
          (a, b) => b._count.upvotes - a._count.upvotes
        );
      case "most-comments":
        return sortedFeedbacks?.sort(
          (a, b) => b._count.comments - a._count.comments
        );
      case "least-upvotes":
        return sortedFeedbacks?.sort(
          (a, b) => a._count.upvotes - b._count.upvotes
        );
      case "least-comments":
        return sortedFeedbacks?.sort(
          (a, b) => a._count.comments - b._count.comments
        );
    }
  }, [feedbacks, feedbacksSort, selectedCategoryId]);

  const feedbackStatuses = [
    { name: "Planned", key: "planned", count: 0, color: "#F49F85" },
    { name: "In-Progress", key: "in-progress", count: 0, color: "#AD1FEA" },
    { name: "Live", key: "live", count: 0, color: "#62BCFA" },
  ];
  if (feedbacks) {
    for (const feedback of feedbacks) {
      const { status } = feedback;
      const statusIndex = feedbackStatuses.findIndex(
        (statusItem) => statusItem.key === status
      );
      if (statusIndex !== -1) {
        feedbackStatuses[statusIndex].count++;
      }
    }
  }
  const changeSortHandler = (sort: string) => {
    setFeedbacksSort(sort);
  };

  return (
    <div className="flex flex-col sm:flex-col lg:flex-row min-h-screen sm:py-2 container mx-auto sm:gap-7">
      <nav className="sm:flex lg:flex-col sm:gap-6 lg:max-w-xs">
        <ApplicationLogo
          className="sm:flex-1 lg:flex-grow-0"
          onMobileMenuClick={() => setShowMobileMenu(true)}
          onMobileMenuCloseClick={() => setShowMobileMenu(false)}
          mobileMenuVisible={showMobileMenu}
        />
        <TagsCloud
          tags={categories}
          onChangeCategory={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
        <RoadmapMenu
          feedbackStatuses={feedbackStatuses}
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
      </nav>
      <main className="flex flex-col w-full gap-7">
        <Outlet />
        <FeedbacksListHeader
          feedbackCount={feedbacks?.length || 0}
          onChangeSort={changeSortHandler}
        />
        <FeedbacksList
          feedbacks={sortedFeedbacks || []}
          upvoteCallBack={onChangeUpvoteHandler}
          user={user}
        />
      </main>
      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
        categories={categories}
        onChangeCategory={setSelectedCategoryId}
        selectedCategoryId={selectedCategoryId}
        feedbackStatuses={feedbackStatuses}
      />
    </div>
  );
}
