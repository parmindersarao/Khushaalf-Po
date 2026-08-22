"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

// Replace this with real data later (API / CMS / props)
const products = [
  {
    id: 1,
    name: "Organic Wheat Seeds",
    price: "₹850",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Bio Fertilizer Pack",
    price: "₹1,200",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Hand Sprayer Pump",
    price: "₹650",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Hand Sprayer Pump",
    price: "₹650",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
  },
   {
    id: 6,
    name: "Organic Wheat Seeds",
    price: "₹850",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
  }
];

// Auto-scroll speed: pixels moved per frame. Lower = slower.
const AUTO_SCROLL_SPEED = 0.6;
// How long (ms) to stay paused after a manual arrow click before auto-scroll resumes
const RESUME_DELAY_AFTER_CLICK = 2500;

export default function Products() {
  const t = useTranslations("Products");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Continuous auto-scroll loop
  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    const step = () => {
      if (!isPausedRef.current && track) {
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 1) {
          // Reached the end — loop back to the start
          track.scrollLeft = 0;
        } else {
          track.scrollLeft += AUTO_SCROLL_SPEED;
        }
      }
      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const pauseTemporarily = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_DELAY_AFTER_CLICK);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16 // gap
      : 260;

    // Pause auto-scroll briefly so it doesn't fight the manual click
    pauseTemporarily();

    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <h2 className="text-xl sm:text-3xl font-bold text-green-800">
          {t("title")}
        </h2>

        {/* Arrow controls — hidden on mobile, mobile users swipe instead */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* Slider track — auto-scrolls slowly, pauses on hover, swipeable on touch */}
      <div
        ref={scrollRef}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        onTouchStart={() => (isPausedRef.current = true)}
        onTouchEnd={pauseTemporarily}
        className="flex gap-4 overflow-x-auto snap-x snap-proximity pb-2 hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[62%] xs:w-[55%] sm:w-[45%] md:w-[23%] bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
          >
            <div className="aspect-square w-full overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-green-700 font-bold text-sm sm:text-base mb-3">
                {product.price}
              </p>
              <button className="w-full bg-green-700 hover:bg-green-800 transition text-white text-xs sm:text-sm font-medium py-2 rounded-md">
                {t("viewProduct")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}