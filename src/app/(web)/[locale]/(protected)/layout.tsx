import { type FC, type ReactNode } from "react";

// interface
interface IProps {
  children: ReactNode;
}

// component
const ProtectedLayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  // render
  return <>{children}</>;
};

export default ProtectedLayoutComponent;
