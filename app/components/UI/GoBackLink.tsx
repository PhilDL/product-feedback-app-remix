import React from 'react';
import { Link } from 'remix';

export type Ref = HTMLAnchorElement;
type Props = {
  [x: string]: any;
  theme?: string;
};

const GoBackLink: React.FC<Props> = React.forwardRef<Ref, Props>(
  function GoBackLink(props, ref) {
    const { onClick, href, theme = "light", ...rest } = props;
    return (
      <Link
        to="/"
        className={`flex items-center ${
          theme === "light"
            ? "text-gray-500 hover:text-gray-700"
            : "text-white hover:text-gray-300"
        } text-sm font-bold cursor-pointer `}
        {...rest}
      >
        <svg
          width="7"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
          className="inline mr-3"
        >
          <path
            d="M6 9L2 5l4-4"
            stroke={theme === "light" ? "#4661E6" : "white"}
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        Go Back
      </Link>
    );
  }
);
export default GoBackLink;
