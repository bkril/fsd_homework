"use client";

import { ChevronDownIcon, GlobeIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { type FC, useTransition } from "react";

import { usePathname, useRouter } from "@/pkg/locale";
import { Button } from "@/pkg/theme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/pkg/theme/ui/dropdown-menu";

// interface
interface IProps {}

// locales config
const LOCALES = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
] as const;

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 px-3 text-xs font-semibold"
          disabled={isPending}
          aria-label={t("language")}
        >
          <GlobeIcon className="h-3.5 w-3.5" />
          {locale.toUpperCase()}
          <ChevronDownIcon className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {LOCALES.map(({ code, label, name }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => switchLocale(code)}
            disabled={locale === code}
            className="gap-2"
          >
            <span className="w-6 text-xs font-semibold">{label}</span>
            <span className="text-muted-foreground">{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcherComponent;
