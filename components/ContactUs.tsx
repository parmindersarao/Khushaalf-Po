"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Play, Pause, ArrowUpRight } from "lucide-react";

// lucide-react ab brand/logo icons (Instagram, Facebook, etc.) export nahi karta,
// isliye custom inline SVG icon use kiya hai
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// 🔧 Apne actual links yahan daalo
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ"; // sirf ID, poora URL nahi
const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;
const INSTAGRAM_URL = ""; // 🔧 baad me apna instagram profile link yahan daal dena

// 🔧 Abhi ke liye dummy/placeholder images — baad me apni real insta post images se replace karna
const instaImages = [
  "https://picsum.photos/seed/insta1/400/400",
  "https://picsum.photos/seed/insta2/400/400",
  "https://picsum.photos/seed/insta3/400/400",
];

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => setIsPlaying(true);
  const handleMouseLeave = () => setIsPlaying(false);

  const handleStopClick = (e: React.MouseEvent) => {
    // button ka click card ke link tak na pahoche isliye stopPropagation
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h2 className="text-xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-10">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 lg:items-stretch">
        {/* YouTube video card */}
        <a
          href={YOUTUBE_WATCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-md ring-1 ring-green-100"
        >
          {isPlaying ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
              title={t("videoTitle")}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                alt={t("videoTitle")}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <Play
                    className="h-6 w-6 sm:h-7 sm:w-7 text-green-700 translate-x-0.5"
                    fill="currentColor"
                  />
                </div>
              </div>
            </>
          )}

          {/* Stop button — sirf jab video play ho rahi ho tab dikhega */}
          {isPlaying && (
            <button
              onClick={handleStopClick}
              aria-label={t("stopVideo")}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <Pause className="h-4 w-4" fill="currentColor" />
            </button>
          )}

          {/* "New tab me khulega" hint */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-green-800 opacity-0 group-hover:opacity-100 transition-opacity">
            {t("watchOnYoutube")}
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </a>

        {/* Instagram images */}
        <div className="flex flex-col lg:h-full">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:flex-1 lg:auto-rows-fr">
            {instaImages.map((src, i) => (
              <a
                key={i}
                href={INSTAGRAM_URL || undefined}
                target={INSTAGRAM_URL ? "_blank" : undefined}
                rel={INSTAGRAM_URL ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  // jab tak INSTAGRAM_URL set nahi hota, click pe kuch na ho
                  if (!INSTAGRAM_URL) e.preventDefault();
                }}
                className="group relative aspect-square lg:aspect-auto overflow-hidden rounded-xl ring-1 ring-green-100 cursor-pointer"
              >
                <img
                  src={src}
                  alt={t("instaImageAlt", { index: i + 1 })}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                  <InstagramIcon className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}