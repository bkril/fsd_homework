import { type FC, type SVGProps } from "react";

export const IconAuthBackgroundShape: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 770 770"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="385" cy="385" r="384.5" stroke="currentColor" strokeOpacity="0.08" />
    <circle cx="385" cy="385" r="310" stroke="currentColor" strokeOpacity="0.06" />
    <circle cx="385" cy="385" r="230" stroke="currentColor" strokeOpacity="0.04" />
  </svg>
);

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
