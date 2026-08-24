import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhoWeAre() {
  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">

        {/* Left */}
        <div className="order-2 lg:order-1">

          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            WHO WE ARE
          </p>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-[1.08] text-[#183425] sm:text-[38px] lg:text-[44px]">
            Where Heritage Meets
            <br />
            <span className="italic">
              Contemporary Design
            </span>
          </h2>

          <p className="mt-5 text-[14px] leading-7 text-[#6B6259]">
            His Masterpiece was born from a conviction that handcraft and
            beautiful design belong together — and that retailers deserve
            access to products carrying a genuine story.
          </p>

          <p className="mt-4 text-[14px] leading-7 text-[#6B6259]">
            Our collections are inspired by India's rich craft heritage,
            interpreted through contemporary design while maintaining
            uncompromising quality and authenticity.
          </p>

          <p className="mt-4 text-[14px] leading-7 text-[#6B6259]">
            With our own manufacturing, every piece is produced with care,
            consistency and the reliability that retailers expect from a
            long-term partner.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/wholesale"
              className="group inline-flex items-center gap-2 bg-[#183425] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#10261c]"
            >
              Apply For Trade Access

              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/collections"
              className="inline-flex items-center border border-[#183425] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425] transition-all duration-300 hover:bg-[#183425] hover:text-white"
            >
              View Collections
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="order-1 overflow-hidden lg:order-2">
          <img
            src="/images/about/about-story.jpg"
            alt="His Masterpiece"
            loading="lazy"
            className="h-[320px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[420px] lg:h-[560px]"
          />
        </div>

      </div>
    </section>
  );
}