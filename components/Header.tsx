"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#services", label: t("services") },
    { href: `/${locale}/register`, label: t("register") },
  ];

  return (
    <header className="bg-green-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo — shrinks on small screens so it never wraps awkwardly */}
        <Link
          href={`/${locale}`}
          className="text-base sm:text-xl md:text-2xl font-bold tracking-wide leading-tight max-w-[55%] sm:max-w-none"
        >
          {t("brand")}
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-green-200 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side — hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/register`}
            className="bg-white text-green-800 px-4 py-2 rounded-md font-semibold hover:bg-green-100 transition"
          >
            {t("getStarted")}
          </Link>
        </div>

        {/* Mobile right side — language switcher stays visible + hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex flex-col justify-center items-center w-9 h-9 shrink-0"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white my-1 transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 pb-4 gap-1 bg-green-800 border-t border-green-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm font-medium hover:text-green-200 transition border-b border-green-700/50 last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/register`}
            onClick={() => setMenuOpen(false)}
            className="mt-3 bg-white text-green-800 text-center px-4 py-2.5 rounded-md font-semibold hover:bg-green-100 transition"
          >
            {t("getStarted")}
          </Link>
        </nav>
      </div>
    </header>
  );
}