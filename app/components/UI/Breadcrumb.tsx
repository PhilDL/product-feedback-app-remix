import React from "react";

export type Props = {
  children: React.ReactNode;
};
const Breadcrumb: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center">
      <svg
        className="w-6 h-6 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="ml-1 text-md font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
        {children}
      </span>
    </div>
  );
};
export default Breadcrumb;