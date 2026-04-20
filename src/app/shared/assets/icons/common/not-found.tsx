import { type FC, type SVGProps } from "react";

export const IconNotFound: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="100" cy="90" r="60" stroke="currentColor" strokeWidth="6" strokeOpacity="0.2" />
    <line x1="145" y1="135" x2="175" y2="165" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.3" />
    <text x="72" y="100" fontSize="40" fill="currentColor" fillOpacity="0.25">?</text>
  </svg>
);
