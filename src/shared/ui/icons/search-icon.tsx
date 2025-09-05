import type { FC, SVGProps } from "react";

export const SearchIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.16667 15.8333C13.8486 15.8333 17.6667 12.0152 17.6667 7.33333C17.6667 2.65152 13.8486 -1.16667 9.16667 -1.16667C4.48485 -1.16667 0.666667 2.65152 0.666667 7.33333C0.666667 12.0152 4.48485 15.8333 9.16667 15.8333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 17.5L13.875 13.875"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
