import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pa", "hi", "en"],
  defaultLocale: "pa",
  localePrefix: "always",
});