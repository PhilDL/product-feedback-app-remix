import React from "react";
import { Link } from "remix";

type Props = {
  [x: string]: any;
  className?: string;
  role?: string;
  to: string;
};

const COLOR_ROLES: { [key: string]: string } = {
  primary: "text-fushia",
  secondary: "text-gray-700",
  default: "text-blue ",
  danger: "text-red",
};

const UnstyledButton: React.FC<Props> = (props) => {
  const { children, className, to, role = "default", ...rest } = props;
  const color = COLOR_ROLES[role] || COLOR_ROLES.default;

  return (
    <Link
      className={`
        background-transparent font-semibold px-3 py-1 
        text-sm outline-none focus:outline-none 
        mr-1 mb-1 ease-linear transition-all hover:underline
        duration-150 ${color} ${className}`}
      {...rest}
      to={to}
    >
      {children}
    </Link>
  );
};
export default UnstyledButton;
