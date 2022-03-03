import { useState } from 'react';
import { Outlet, useLoaderData, useOutletContext } from 'remix';
import MobileMenu from '~/components/MobileMenu';
import RoadmapMenu from '~/components/RoadmapMenu';
import TagsCloud from '~/components/TagsCloud';
import ApplicationLogo from '~/components/UI/ApplicationLogo';
import { getAllCategories } from '~/models/category';
import { getFeedbackStatuses } from '~/models/feedback';

import type { LoaderFunction } from "remix";
import type { Category, Feedback, User, FeedbackStatuses } from "~/types";

export type LoaderData = {
  categories: Array<Category>;
  feedbackStatuses: FeedbackStatuses;
};

export let loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    categories: await getAllCategories(),
    feedbackStatuses: await getFeedbackStatuses(),
  };
  return data;
};

export interface FeedbackModel extends Feedback {
  _count: { comments: number; upvotes: number };
  user: User;
  category: Category;
}
export default function Suggestions() {
  const { categories, feedbackStatuses } = useLoaderData<LoaderData>();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const outletContext = useOutletContext();

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
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
        <RoadmapMenu
          feedbackStatuses={feedbackStatuses}
          className="hidden sm:flex sm:flex-1 lg:flex-grow-0"
        />
      </nav>
      <Outlet context={outletContext} />
      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
        categories={categories}
        feedbackStatuses={feedbackStatuses}
      />
    </div>
  );
}
