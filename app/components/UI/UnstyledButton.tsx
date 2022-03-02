import React from "react";

type Props = {
  className?: string;
  [x: string]: any;
};
const UnstyledButton: React.FC<Props> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <button
      className={`
        text-blue background-transparent font-semibold px-3 py-1 
        text-sm outline-none focus:outline-none 
        mr-1 mb-1 ease-linear transition-all hover:underline
        duration-150 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default UnstyledButton;
