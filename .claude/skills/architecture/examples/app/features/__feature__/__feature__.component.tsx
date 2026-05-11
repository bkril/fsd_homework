"use client";

import { type FC } from "react";

// interface
interface IProps {
  variant?: "default" | "compact";
}

// component
const __Feature__Component: FC<Readonly<IProps>> = (props) => {
  const { variant = "default" } = props;

  const handleClick = () => {
    // perform the user-initiated action
  };

  // render
  return (
    <button onClick={handleClick} data-variant={variant}>
      {/* feature trigger */}
    </button>
  );
};

export default __Feature__Component;
