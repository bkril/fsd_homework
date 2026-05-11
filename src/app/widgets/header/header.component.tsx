"use client";

import { useTranslations } from "next-intl";
import { type FC } from "react";

import { IconAppLogo } from "@/app/shared/assets/icons/common";
import { LanguageSwitcherComponent } from "@/app/shared/components/language-switcher";
import { WrapperComponent } from "@/app/shared/components/wrapper";
import { useIsScrolled } from "@/app/shared/hooks";
import { Link } from "@/pkg/locale";
import { cn } from "@/pkg/theme/lib/utils";
import { Button } from "@/pkg/theme/ui/button";

import { HeaderMobileComponent, UserNavComponent } from "./elements";

// component
const HeaderComponent: FC = () => {
  const t = useTranslations("nav");

  const isScrolled = useIsScrolled();

  // render
  return (
    <header className="transition-bg fixed z-50 grid h-[88px] w-full items-center px-4">
      <WrapperComponent
        type="section"
        className={cn(
          "flex h-fit w-full items-center justify-between gap-8 rounded-xl border border-transparent p-0 transition-all",
          {
            "bg-background/90 border-border/50 p-2 shadow-xs md:p-4": isScrolled,
          },
        )}
      >
        <IconAppLogo width={48} height={48} />

        <div className="flex items-center gap-2">
          <LanguageSwitcherComponent />

          <Button asChild variant="outline" className="max-md:hidden">
            <Link href="/countries">{t("explore_countries")}</Link>
          </Button>

          <UserNavComponent />

          <HeaderMobileComponent />
        </div>
      </WrapperComponent>
    </header>
  );
};

export default HeaderComponent;
