import { type FC, type ReactNode } from "react";

// interface
interface IProps {
  children: ReactNode;
}

// component
const WebLayout: FC<Readonly<IProps>> = ({ children }) => {
  return children;
};

export default WebLayout;
