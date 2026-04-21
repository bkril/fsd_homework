"use client";

import { type FC, type ReactNode, useEffect, useState } from "react";

import { WrapperComponent } from "@/app/shared/components/wrapper";
import { cn } from "@/pkg/theme/lib/utils";

// interface
interface IProps {
  children: ReactNode;
}

// component
const HeaderScrollComponent: FC<Readonly<IProps>> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // render
  return (
    <WrapperComponent
      type="section"
      className={cn(
        "flex h-fit w-full items-center justify-between gap-8 rounded-xl border border-transparent p-0 transition-all",
        {
          "bg-background/90 border-border/50 p-2 shadow-xs md:p-4": isScrolled,
        },
      )}
    >
      {children}
    </WrapperComponent>
  );
};

export default HeaderScrollComponent;
