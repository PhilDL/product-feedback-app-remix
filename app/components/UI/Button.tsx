import React from "react";

export type ButtonProps = {
  role: string;
  className?: string;
  [x: string]: any;
};

const COLOR_ROLES: { [key: string]: string } = {
  primary: "bg-fushia hover:bg-fushia-light disabled:bg-fushia-light/75",
  secondary: "bg-blue hover:bg-blue-light disabled:bg-blue-light/75",
  default:
    "bg-gray-700 hover:bg-gray-700-lighter disabled:bg-gray-700-lighter/75",
  danger: "bg-red hover:bg-red-lighter disabled:bg-red-lighter/75",
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, role, className, ...rest } = props;
  const color = COLOR_ROLES[role] || COLOR_ROLES.default;
  return (
    <button
      className={`py-2.5 px-3 sm:px-6 text-white font-bold text-sm rounded ${color} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
