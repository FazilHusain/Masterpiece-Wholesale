import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebsiteBanners } from "../../../redux/websiteBanner";

const FALLBACK_SLIDES = [
  {
    _id: "fallback-1",
    title: "Luxury Living Starts Here",
    subtitle: "WORLDWIDE EXPORT QUALITY",
    description:
      "Designed for luxury hotels, wholesalers, retailers and modern homes across the globe.",
    desktopImage: "/images/hero/hero-banner1.jpg",
    mobileImage: "/images/hero/hero-banner1.jpg",
    buttonText: "Discover More",
    buttonLink: "/collections",
    isActive: true,
    page: "Home",
    type: "Hero",
    displayOrder: 1,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();

  const { banners } = useSelector(
    (state) => state.websiteBanner,
  );

  /* ==========================================
     ACTIVE HOME HERO BANNERS
  ========================================== */

  const activeSlides =
    banners
      ?.filter(
        (banner) =>
          banner.isActive &&
          banner.page === "Home" &&
          banner.type === "Hero",
      )
      ?.sort(
        (a, b) =>
          (a.displayOrder || 0) -
          (b.displayOrder || 0),
      ) || [];

  const slides =
    activeSlides.length > 0
      ? activeSlides
      : FALLBACK_SLIDES;

  /* ==========================================
     FETCH BANNERS
  ========================================== */

  useEffect(() => {
    dispatch(fetchWebsiteBanners());
  }, [dispatch]);

  /* ==========================================
     RESET CURRENT SLIDE
     IF BANNER COUNT CHANGES
  ========================================== */

  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  /* ==========================================
     AUTO PLAY
  ========================================== */

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[current];

  if (!currentSlide) return null;

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        h-[260px]
        sm:h-[330px]
        md:h-[380px]
        lg:h-[420px]
        xl:h-[460px]
      "
    >
      {/* ==========================================
          SLIDES / IMAGES
      ========================================== */}

      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <picture>
            {/* ======================================
                MOBILE IMAGE
            ====================================== */}

            <source
              media="(max-width: 768px)"
              srcSet={
                slide.mobileImage ||
                slide.desktopImage ||
                "/images/hero/hero-banner1.jpg"
              }
            />

            {/* ======================================
                DESKTOP IMAGE
            ====================================== */}

            <img
              src={
                slide.desktopImage ||
                "/images/hero/hero-banner1.jpg"
              }
              onError={(e) => {
                e.currentTarget.src =
                  "/images/hero/hero-banner1.jpg";
              }}
              alt={slide.title || "His Masterpiece"}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
              "
            />

            {/* ======================================
                SUBTLE OVERLAY
                Keeps image readable/rich
            ====================================== */}

            <div className="absolute inset-0 bg-black/10" />
          </picture>
        </div>
      ))}

      {/* ==========================================
          SLIDER DOTS
      ========================================== */}

      {slides.length > 1 && (
        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-2
            sm:bottom-7
            sm:gap-3
          "
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${
                current === index
                  ? "h-2.5 w-8 rounded-full bg-[#b38b59] sm:h-3 sm:w-10"
                  : "h-2.5 w-2.5 rounded-full bg-white/70 hover:bg-white sm:h-3 sm:w-3"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}