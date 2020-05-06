import React from "react";

const ArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 16 6"
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#979797"
      strokeLinecap="round"
      strokeLinejoin="bevel"
      strokeWidth="1.5"
      d="M15.25 1.234L8.125 5 1 1.234"
    />
  </svg>
);

const ArrowUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 16 6"
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#979797"
      strokeLinecap="round"
      strokeLinejoin="bevel"
      strokeWidth="1.5"
      d="M1 4.766L8.125 1l7.125 3.766"
    />
  </svg>
);

export { ArrowDown, ArrowUp };
