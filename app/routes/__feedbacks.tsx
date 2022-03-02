import { useState, useMemo } from "react";
import ApplicationLogo from "../components/UI/ApplicationLogo";
import FeedbacksListHeader from "../components/FeedbacksListHeader";
import FeedbacksList from "../components/FeedbacksList";
import RoadmapMenu from "../components/RoadmapMenu";
import TagsCloud from "../components/TagsCloud";
import MobileMenu from "../components/MobileMenu";
import { db, getFeedbackStatuses } from "~/utils/db.server";
import { useLoaderData, Outlet } from "remix";
import type { LoaderFunction } from "remix";
import type { Category, Feedback, User } from "@prisma/client";
import type { FeedbackStatuses } from "~/utils/db.server";
import { auth } from "~/auth.server";

export type LoaderData = {
  categories: Array<Category>;
  feedbackStatuses: FeedbackStatuses;
  user: User | null;
  selectedCategorySlug: string | null;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  let selectedCategorySlug = params.categorySlug || null;
  console.log("selectedCategorySlug", selectedCategorySlug);
  const data: LoaderData = {
    categories: await db.category.findMany(),
    feedbackStatuses: await getFeedbackStatuses(),
    user: await auth.isAuthenticated(request),
    selectedCategorySlug: selectedCategorySlug,
  };
  return data;
};

export interface FeedbackModel extends Feedback {
  _count: { comments: number; upvotes: number };
  user: User;
  category: Category;
}
export default function Suggestions() {
  const { categories, feedbackStatuses, selectedCategorySlug } =
    useLoaderData<LoaderData>();
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

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
          selectedCategoryId={selectedCategorySlug}
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
        <RoadmapMenu
          feedbackStatuses={feedbackStatuses}
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
      </nav>
      <Outlet />
      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
        categories={categories}
        selectedCategoryId={selectedCategorySlug}
        feedbackStatuses={feedbackStatuses}
      />
    </div>
  );
}
