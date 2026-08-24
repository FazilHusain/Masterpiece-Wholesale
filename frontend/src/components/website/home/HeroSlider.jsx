import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <section className="relative h-[350px] overflow-hidden bg-black sm:h-[450px] lg:h-[550px] xl:h-[600px]">
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
            {/* MOBILE IMAGE */}

            <source
              media="(max-width: 768px)"
              srcSet={
                slide.mobileImage ||
                "/images/hero/hero-banner1.jpg"
              }
            />

            {/* DESKTOP IMAGE */}

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
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </picture>

          {/* Dark overlay */}

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        </div>
      ))}

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
        <div className="max-w-2xl text-white">

          {/* ======================================
              SUBTITLE
              Hidden on mobile
          ====================================== */}

          {currentSlide.subtitle && (
            <span className="mb-6 hidden rounded-full border border-[#b38b59] px-5 py-2 text-xs uppercase tracking-[0.35em] text-[#d8b26a] sm:inline-block">
              {currentSlide.subtitle}
            </span>
          )}

          {/* ======================================
              TITLE
          ====================================== */}

          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
            }}
          >
            {currentSlide.title}
          </h1>

          {/* ======================================
              DESCRIPTION
          ====================================== */}

          {currentSlide.description && (
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:mt-8 sm:text-lg sm:leading-8">
              {currentSlide.description}
            </p>
          )}

          {/* ======================================
              CTA
          ====================================== */}

          {currentSlide.buttonText && (
            <div className="mt-8 flex flex-wrap gap-5 sm:mt-10">
              <Link
                to={
                  currentSlide.buttonLink ||
                  "/collections"
                }
                className="rounded-full bg-[#b38b59] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#9a7445]"
              >
                {currentSlide.buttonText}
              </Link>
            </div>
          )}

          {/* ======================================
              STATS
          ====================================== */}

          <div className="mt-10 hidden max-w-xl grid-cols-3 gap-8 lg:mt-16 lg:grid">
            <div>
              <h3 className="text-3xl font-semibold text-[#d8b26a]">
                15+
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gray-300">
                Countries Served
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-[#d8b26a]">
                500+
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gray-300">
                Premium Products
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-[#d8b26a]">
                100%
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gray-300">
                Export Quality
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          DOTS
      ========================================== */}

      {slides.length > 1 && (
        <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-10 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${
                current === index
                  ? "h-2.5 w-8 rounded-full bg-[#b38b59] sm:h-3 sm:w-10"
                  : "h-2.5 w-2.5 rounded-full bg-white/60 hover:bg-white sm:h-3 sm:w-3"
              }`}
            />
          ))}
        </div>
      )}

      {/* ==========================================
          FLOATING CARD
          Desktop Only
      ========================================== */}

      <div className="absolute bottom-10 right-10 z-30 hidden w-[360px] rounded-3xl border border-white/20 bg-white/10 p-8 text-white backdrop-blur-xl xl:block">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d8b26a]">
          Luxury Collection
        </span>

        <h3
          className="mt-4 text-3xl"
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
          }}
        >
          Crafted With
          <br />
          Timeless Elegance
        </h3>

        <p className="mt-5 leading-7 text-gray-200">
          Every piece is thoughtfully designed using
          premium materials, exceptional craftsmanship
          and luxurious finishes for homes across the
          world.
        </p>

        <Link
          to="/collections"
          className="mt-7 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#b38b59] hover:text-white"
        >
          View Collection
        </Link>
      </div>

      {/* ==========================================
          SCROLL INDICATOR
          Desktop Only
      ========================================== */}

      <div className="absolute bottom-10 left-10 z-30 hidden flex-col items-center text-white lg:flex">
        <span className="mb-3 rotate-90 origin-center text-[11px] uppercase tracking-[0.35em] text-gray-300">
          Scroll
        </span>

        <div className="relative h-16 w-[2px] overflow-hidden rounded-full bg-white/20">
          <span className="absolute left-0 top-0 h-6 w-full animate-bounce bg-[#b38b59]" />
        </div>
      </div>

      {/* ==========================================
          SOCIAL
          Desktop Only
      ========================================== */}

      <div className="absolute right-10 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-6 text-white xl:flex">
        <a
          href="#"
          className="rotate-90 text-xs uppercase tracking-[0.3em] transition hover:text-[#d8b26a]"
        >
          Instagram
        </a>

        <a
          href="#"
          className="rotate-90 text-xs uppercase tracking-[0.3em] transition hover:text-[#d8b26a]"
        >
          Pinterest
        </a>
      </div>

      {/* ==========================================
          MOBILE BOTTOM GRADIENT
      ========================================== */}

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/30 to-transparent lg:hidden" />
    </section>
  );
}