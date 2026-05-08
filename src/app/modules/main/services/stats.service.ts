import { GlobeIcon, MapIcon, UsersIcon } from "lucide-react";
import type { getTranslations } from "next-intl/server";

type TTranslator = Awaited<ReturnType<typeof getTranslations<"main">>>;

export const getMainStats = (t: TTranslator) =>
  [
    { icon: GlobeIcon, value: "195", label: t("stat_countries") },
    { icon: UsersIcon, value: "8B+", label: t("stat_people") },
    { icon: MapIcon, value: "7", label: t("stat_continents") },
  ] as const;
