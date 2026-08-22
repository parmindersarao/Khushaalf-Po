import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section
      className="relative bg-cover bg-center h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,50,0,0.55), rgba(0,50,0,0.55)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white w-full">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-snug sm:leading-tight mb-3 sm:mb-4">
          {t("title1")} <br /> {t("title2")}
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 max-w-xl">
          {t("subtitle")}
        </p>
        <Link
          href={`/${locale}/register`}
          className="block sm:inline-block text-center bg-green-600 hover:bg-green-700 transition text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold text-sm sm:text-lg w-full sm:w-auto"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}