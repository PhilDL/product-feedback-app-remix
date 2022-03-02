import React, { useState } from "react";
import Tag from "./UI/Tag";
import Card from "./UI/Card";
import type { Category } from "@prisma/client";

export type TagsCloudProps = {
  tags: Category[];
  selectedCategoryId?: string | null;
  className?: string;
};

const TagsCloud: React.FC<TagsCloudProps> = ({
  tags,
  selectedCategoryId = null,
  className,
}: TagsCloudProps) => {
  const [selectedCategorySlug, setSelectedCategorySlug] =
    useState<string | null>(selectedCategoryId);

  const onChangeCategory = (slug: string | null) => {
    setSelectedCategorySlug(slug);
  };
  return (
    <Card className={`flex-wrap gap-x-2 gap-y-3 ${className}`}>
      <Tag
        onClick={() => onChangeCategory(null)}
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
          onClick={() => onChangeCategory(tag.slug)}
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
