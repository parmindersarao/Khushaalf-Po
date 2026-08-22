import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Header");

  return (
    <footer className="bg-green-900 text-green-100 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">{nav("brand")}</h3>
          <p className="text-sm text-green-200">{t("tagline")}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-green-200">
            <li><a href="#about" className="hover:text-white">{nav("about")}</a></li>
            <li><a href="#services" className="hover:text-white">{nav("services")}</a></li>
            <li><a href="#" className="hover:text-white">{nav("register")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("contact")}</h4>
          <p className="text-sm text-green-200">📍 Ludhiana, Punjab, India</p>
          <p className="text-sm text-green-200">📞 +91 98765 43210</p>
          <p className="text-sm text-green-200">✉️ info@greenfields.com</p>
        </div>
      </div>
      <div className="border-t border-green-700 text-center text-xs py-4 text-green-300">
        © {new Date().getFullYear()} {nav("brand")}. {t("rights")}
      </div>
    </footer>
  );
}