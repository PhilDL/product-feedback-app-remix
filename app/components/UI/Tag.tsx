import React from "react";
import { Link } from "remix";

export type TagProps = {
  selected?: boolean;
  slug?: string;
  [x: string]: any;
};

const Tag: React.FC<TagProps> = (props) => {
  const { children, slug, selected, ...rest } = props;
  return (
    <Link
      to={slug ? `/category/${slug}` : "/"}
      className={`py-1.5 px-3.5 font-semibold text-sm rounded hover:bg-gray-100-lighter cursor-pointer ${
        selected
          ? "text-white bg-blue hover:bg-blue-light"
          : "text-blue bg-gray-100 hover:bg-gray-100-lighter"
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
};
export default Tag;
