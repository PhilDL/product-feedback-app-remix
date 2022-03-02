import React from "react";
import { useFetcher } from "remix";

export type UpvoteProps = {
  active: boolean;
  count: number;
  feedbackId: string;
  [x: string]: any;
  inlineStyle?: boolean;
};

const Upvote: React.FC<UpvoteProps> = (props) => {
  const { count, active, inlineStyle, feedbackId, ...rest } = props;
  let fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action={`/api/feedbacks/${feedbackId}/upvote`}>
      <input type="hidden" name="upvote" value={active ? "false" : "true"} />
      <input type="hidden" name="_action" value={"UPVOTE"} />
      <button
        className={`flex ${
          inlineStyle
            ? "flex-row py-2 px-4 gap-2.5"
            : "flex-col py-2.5 px-2 gap-1.5"
        } items-center justify-between text-center font-bold text-xs rounded ${
          active
            ? "text-white bg-blue hover:bg-blue-light"
            : "text-gray-700 bg-gray-100 hover:bg-gray-100-lighter"
        }`}
        {...rest}
      >
        <span className="sr-only">
          {active ? "Remove your upvote" : "Upvote this feedback"}
        </span>
        <svg
          className={active ? "stroke-current" : "stroke-blue"}
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6l4-4 4 4"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        {count} <span className="sr-only">upvotes</span>
      </button>
    </fetcher.Form>
  );
};
export default Upvote;
