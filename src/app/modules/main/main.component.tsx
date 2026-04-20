import { type FC } from "react";

// interface
interface IProps {}

// component
const MainComponent: FC<Readonly<IProps>> = () => {
  // render
  return (
    <h1 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl text-center">
      Sizzling Summer Delights
    </h1>
  );
};

export default MainComponent;
