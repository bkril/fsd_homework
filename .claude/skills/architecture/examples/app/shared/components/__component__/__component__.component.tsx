// Purely presentational. No domain knowledge, no side effects.
// If this component starts needing domain context, move it to `features/`.

import { type FC, type ReactNode } from "react";

// interface
interface IProps {
  children: ReactNode;
}

// component
const __Component__Component: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  // render
  return <div>{children}</div>;
};

export default __Component__Component;
