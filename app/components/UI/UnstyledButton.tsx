import React from "react";

type Props = {
  className?: string;
  role?: string;
  [x: string]: any;
};

const COLOR_ROLES: { [key: string]: string } = {
  primary: "text-fushia",
  secondary: "text-gray-700",
  default: "text-blue ",
  danger: "text-red",
};

const UnstyledButton: React.FC<Props> = (props) => {
  const { children, className, role = "default", ...rest } = props;
  const color = COLOR_ROLES[role] || COLOR_ROLES.default;

  return (
    <button
      className={`
        background-transparent font-semibold px-3 py-1 
        text-sm outline-none focus:outline-none 
        mr-1 mb-1 ease-linear transition-all hover:underline
        duration-150 ${color} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default UnstyledButton;
