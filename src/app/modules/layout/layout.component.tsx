import { type FC, type ReactNode } from "react";

import { HeaderComponent } from "@/app/widgets/header";

// interface
interface IProps {
  children: ReactNode;
  type: "public" | "protected";
}

// component
const LayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children, type } = props;

  // render
  return (
    <div className="relative z-0">
      {type === "public" && <HeaderComponent />}

      {children}
    </div>
  );
};

export default LayoutComponent;
