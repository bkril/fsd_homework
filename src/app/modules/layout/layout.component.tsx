"use client";

import { usePathname } from "@/pkg/locale";
import { type FC, type ReactNode } from "react";

// interface
interface IProps {
  children: ReactNode;
  header: ReactNode;
}

// component
const LayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children, header } = props;

  const pathname = usePathname();

  const isAuthPage = pathname.includes("/sign-in") || pathname.includes("/sign-up");

  // render
  return (
    <div className="relative z-0">
      {!isAuthPage && header}

      {children}
    </div>
  );
};

export default LayoutComponent;
