import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function AboutCTA() {
  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">

        {/* Label */}
        <span className="text-[9px] font-medium uppercase tracking-[0.45em] text-[#B68C2F]">
          PARTNER WITH US
        </span>

        {/* Heading */}
        <h2 className="mt-4 font-cormorant text-[34px] font-normal leading-[1.1] text-[#183425] sm:text-[38px] lg:text-[44px]">
          Ready to Stock{" "}
          <span className="italic">
            His Masterpiece?
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-[#6B6259]">
          Join our network of retailers and designers who carry
          His Masterpiece collections.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            to="/wholesale"
            className="group inline-flex items-center gap-2 bg-[#183425] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#10261c]"
          >
            Apply For Trade Access

            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#1EBE5D]"
          >
            <FaWhatsapp size={15} />
            WhatsApp Us
          </a>

        </div>

      </div>
    </section>
  );
}