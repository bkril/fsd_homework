import { type FC } from "react";

// interface
interface IProps {
  value: number;
}

// component
const __Element__Component: FC<Readonly<IProps>> = (props) => {
  const { value } = props;

  // render
  return <div>{value}</div>;
};

export default __Element__Component;
