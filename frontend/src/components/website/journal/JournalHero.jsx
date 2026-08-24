import { Link } from "react-router-dom";

export default function JournalHero() {
  return (
    <section className="bg-[#183425] text-white">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-10 text-center sm:px-8 lg:px-10 lg:py-14">

        {/* Eyebrow */}

        <span className="mb-3 text-[8px] font-medium uppercase tracking-[0.4em] text-[#C8A55A]">
          Stories & Insights
        </span>

        {/* Heading */}

        <h1
          className="max-w-4xl text-[38px] font-medium leading-none text-white sm:text-[44px] lg:text-[52px]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          The{" "}
          <span className="italic font-normal text-[#C8A55A]">
            Journal
          </span>
        </h1>

        {/* Description */}

        <p className="mt-4 max-w-lg text-[11px] leading-5 text-white/70 sm:text-[12px]">
          Discover the craftsmanship, inspiration and timeless stories
          behind every collection. From artisan techniques to sourcing,
          sustainability and design philosophy.
        </p>

        {/* Buttons */}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">

          <Link
            to="#stories"
            className="border border-[#C8A55A] bg-[#C8A55A] px-5 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#183425] transition-all duration-300 hover:bg-transparent hover:text-[#C8A55A]"
          >
            Explore Stories
          </Link>

          <Link
            to="/collections"
            className="border border-white/25 px-5 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#C8A55A] hover:text-[#C8A55A]"
          >
            View Collections
          </Link>

        </div>

      </div>
    </section>
  );
}