import { defineRouting } from "next-intl/routing";

// routing
export const routing = defineRouting({
  locales: ["en", "de"],
  localePrefix: "always",
  localeDetection: false,
  defaultLocale: "en",
});
