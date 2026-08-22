"use client";

import { useTranslations } from "next-intl";
import { GraduationCap, Globe2, HeartHandshake, Users } from "lucide-react";

const icons = [GraduationCap, Globe2, HeartHandshake, Users];

export default function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");

  const items = [
    {
      title: t("item1Title"),
      desc: t("item1Desc"),
    },
    {
      title: t("item2Title"),
      desc: t("item2Desc"),
    },
    {
      title: t("item3Title"),
      desc: t("item3Desc"),
    },
    {
      title: t("item4Title"),
      desc: t("item4Desc"),
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h2 className="text-xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-10">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-10 sm:gap-y-8">
        {items.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-green-700" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}