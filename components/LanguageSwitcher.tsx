"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const languageNames: Record<string, string> = {
  pa: "हिंदी",
  hi: "English",
  en: "ਪੰਜਾਬੀ",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const locales = routing.locales;
    const currentIndex = locales.indexOf(locale as (typeof locales)[number]);
    const nextLocale = locales[(currentIndex + 1) % locales.length];

    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Change language, current: ${languageNames[locale]}`}
      title={languageNames[locale]}
      className="flex items-center gap-2 bg-green-700 text-white text-sm rounded-md px-3 py-2 border border-green-600 hover:bg-green-600 transition-colors focus:outline-none cursor-pointer"
    >
      <Image
        src="/language-icon.svg"
        alt="Change language"
        width={20}
        height={20}
      />
      <span>{languageNames[locale]}</span>
    </button>
  );
}