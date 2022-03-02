import { DialogOverlay, DialogContent } from "@reach/dialog";
import TagsCloud from "./TagsCloud";
import RoadmapMenu from "./RoadmapMenu";

import type { Category } from "@prisma/client";
import type { FeedbackStatusAggregate } from "../types/models";

export type MobileMenuProps = {
  isOpen: boolean;
  onDismiss: () => void;
  categories: Category[];
  selectedCategoryId: string | null;
  feedbackStatuses: FeedbackStatusAggregate[];
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onDismiss,
  categories,
  selectedCategoryId,
  feedbackStatuses,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={onDismiss}
      className="fixed top-20 left-0 right-0 bottom-0 bg-gray-overlay flex justify-end items-center sm:hidden"
    >
      <DialogContent
        aria-label="Navigation Menu"
        className="bg-gray-300 w-72 h-full p-6 flex flex-col justify-start gap-9 sm:hidden"
      >
        <TagsCloud
          tags={categories}
          selectedCategoryId={selectedCategoryId}
          className=""
        />
        <RoadmapMenu feedbackStatuses={feedbackStatuses} className="" />
      </DialogContent>
    </DialogOverlay>
  );
};

export default MobileMenu;