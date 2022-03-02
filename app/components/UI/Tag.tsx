import React from "react";

export type TagProps = {
  selected?: boolean;
  [x: string]: any;
};

const Tag: React.FC<TagProps> = (props) => {
  const { children, selected, ...rest } = props;
  return (
    <button
      className={`py-1.5 px-3.5 font-semibold text-sm rounded hover:bg-gray-100-lighter cursor-pointer ${
        selected
          ? "text-white bg-blue hover:bg-blue-light"
          : "text-blue bg-gray-100 hover:bg-gray-100-lighter"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Tag;
