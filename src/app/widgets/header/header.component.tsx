import { useTranslations } from "next-intl";
import { type FC } from "react";

import { LanguageSwitcherComponent } from "@/app/features/language-switcher";
import { IconAppLogo } from "@/app/shared/assets/icons/common";
import { Link } from "@/pkg/locale";
import { Button } from "@/pkg/theme/ui/button";

import {
  HeaderMobileComponent,
  HeaderScrollComponent,
  UserNavComponent,
} from "./elements";

// interface
interface IProps {}

// component
const HeaderComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations("nav");

  // render
  return (
    <header className="transition-bg fixed z-50 grid h-[88px] w-full items-center px-4">
      <HeaderScrollComponent>
        <IconAppLogo width={48} height={48} />

        <div className="flex items-center gap-2">
          <LanguageSwitcherComponent />

          <Button asChild variant="outline" className="max-md:hidden">
            <Link href="/countries">{t("explore_countries")}</Link>
          </Button>

          <UserNavComponent />

          <HeaderMobileComponent />
        </div>
      </HeaderScrollComponent>
    </header>
  );
};

export default HeaderComponent;
