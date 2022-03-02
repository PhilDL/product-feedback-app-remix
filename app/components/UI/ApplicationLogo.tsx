import React from "react";

export type ApplicationLogoProps = {
  className?: string;
  [x: string]: any;
  mobileMenuVisible: boolean;
  onMobileMenuClick: () => void;
  onMobileMenuCloseClick: () => void;
};

const ApplicationLogo: React.FC<ApplicationLogoProps> = (props) => {
  const {
    className,
    mobileMenuVisible,
    onMobileMenuClick,
    onMobileMenuCloseClick,
    ...rest
  } = props;

  return (
    <div
      className={`relative bg-theme-gradient sm:bg-theme-gradient-md lg:bg-theme-gradient-lg bg-no-repeat bg-cover w-full sm:rounded px-6 py-4 sm:py-6 ${className}`}
      {...rest}
    >
      <h1 className="text-white text-xl font-bold sm:mt-6">Frontend Mentor</h1>
      <span className="text-white/75 font-medium">Feedback board</span>
      {mobileMenuVisible === true ? (
        <button
          className="sm:hidden absolute right-6 top-8"
          onClick={onMobileMenuCloseClick}
        >
          <span className="sr-only">Close mobile menu</span>
          <svg width="18" height="17" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z"
              fill="#FFF"
              fillRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <button
          className="sm:hidden absolute right-6 top-8"
          onClick={onMobileMenuClick}
        >
          <span className="sr-only">Open mobile menu</span>
          <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF" fillRule="evenodd">
              <path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z" />
            </g>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ApplicationLogo;
