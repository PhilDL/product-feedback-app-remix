import React from "react";

type Props = {
  className?: string;
  variant?: string;
  title: string;
  details?: React.ReactNode;
  [x: string]: any;
};

const Alert: React.FC<Props> = ({ title, variant, details }) => {
  let className = "";
  switch (variant) {
    case "info":
      className = "bg-gray-100-lighter text-gray-500";
      break;
    case "success":
      className = " bg-teal-50 text-teal-700";
      break;
    case "error":
      className = "bg-red-lighter text-white";
      break;
    default:
      className = "bg-white";
      break;
  }

  return (
    <div className={`rounded-sm p-3 m-0 text-sm ${className}`}>
      <h4 className="font-bold">{title}</h4>
      {details}
    </div>
  );
};
export default Alert;
