import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import Products from "@/components/Products";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  const about = useTranslations("About");
  const services = useTranslations("Services");

  return (
    <>
      <Header />
      <Hero />
      <Products />
      <WhyChooseUs />
      <ContactUs />

      <section id="about" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          {about("title")}
        </h2>
        <p className="text-gray-600 max-w-2xl">{about("desc")}</p>
      </section>

      <section id="services" className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-green-800 mb-8">
            {services("title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: services("organic"), desc: services("organicDesc") },
              { title: services("soil"), desc: services("soilDesc") },
              { title: services("consulting"), desc: services("consultingDesc") },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg text-green-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}