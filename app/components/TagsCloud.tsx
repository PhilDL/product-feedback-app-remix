import React from 'react';
import { useRouteData } from 'remix-utils';

import Card from './UI/Card';
import Tag from './UI/Tag';

import type { Category } from "@prisma/client";
export type TagsCloudProps = {
  tags: Category[];
  className?: string;
};

const TagsCloud: React.FC<TagsCloudProps> = ({
  tags,
  className,
}: TagsCloudProps) => {
  let selectedCategorySlug: string | null = null;
  const routeData: undefined | { categorySlug: string } = useRouteData(
    "feedback-category-show"
  );
  if (routeData && routeData.categorySlug) {
    selectedCategorySlug = routeData.categorySlug;
  }
  return (
    <Card className={`flex-wrap gap-x-2 gap-y-3 ${className}`}>
      <Tag
        selected={
          selectedCategorySlug === null ||
          tags.filter((t) => t.slug === selectedCategorySlug).length === 0
            ? true
            : false
        }
      >
        All
      </Tag>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          selected={tag.slug === selectedCategorySlug}
          slug={tag.slug}
        >
          {tag.name}
        </Tag>
      ))}
    </Card>
  );
};
export default TagsCloud;
