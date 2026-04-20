import { type FC, type SVGProps } from "react";

export const IconAuthLines: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 400 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" strokeOpacity="0.1" />
    <line x1="0" y1="15" x2="400" y2="15" stroke="currentColor" strokeOpacity="0.05" />
    <line x1="0" y1="45" x2="400" y2="45" stroke="currentColor" strokeOpacity="0.05" />
  </svg>
);
