"use client";

import { useLocale, useTranslations } from "next-intl";
import { type FC, useTransition } from "react";

import { usePathname, useRouter } from "@/pkg/locale";
import { Button } from "@/pkg/theme/ui/button";

// interface
interface IProps {}

// component
const LanguageSwitcherComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  // render
  return (
    <div className="flex items-center gap-1" aria-label={t("language")}>
      <Button
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-10 px-0 text-xs font-semibold"
        onClick={() => switchLocale("en")}
        disabled={isPending || locale === "en"}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </Button>
      <Button
        variant={locale === "de" ? "default" : "ghost"}
        size="sm"
        className="h-8 w-10 px-0 text-xs font-semibold"
        onClick={() => switchLocale("de")}
        disabled={isPending || locale === "de"}
        aria-current={locale === "de" ? "true" : undefined}
      >
        DE
      </Button>
    </div>
  );
};

export default LanguageSwitcherComponent;
