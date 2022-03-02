import React from "react";

type Props = {
  className?: string;
  [x: string]: any;
};

const Card: React.FC<Props> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={`bg-white rounded p-6 flex ${className ? className : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Card;
