import { type FC, type SVGProps } from "react";

export const IconAppLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="logo-grad-inner" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path
      d="M20 2 L35.6 11 L35.6 29 L20 38 L4.4 29 L4.4 11 Z"
      stroke="url(#logo-grad)"
      strokeWidth="1.5"
      fill="url(#logo-grad-inner)"
    />
    <path
      d="M20 9 L29 14 L29 26 L20 31 L11 26 L11 14 Z"
      fill="url(#logo-grad)"
      opacity="0.25"
    />
    <path
      d="M16 14 L16 26 M16 20 L24 20 M16 14 L24 14"
      stroke="url(#logo-grad)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
