import { Link } from "react-router-dom";

export default function TradeHighlights() {
  return (
    <section className="bg-[#f7f5f0] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Outer Gold Frame */}
        <div className="relative border border-[#c8a76b] bg-[#fcfbf8] p-[7px]">
          {/* Inner Gold Frame */}
          <div className="relative border border-[#e7d4aa] px-5 py-10 sm:px-8 sm:py-11 lg:px-12 lg:py-12">
            {/* Top Gold Bar */}
            <div
              className="
                absolute
                left-1/2
                top-0
                h-[6px]
                w-[190px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gradient-to-r
                from-[#8f6b2d]
                via-[#d4b06c]
                to-[#8f6b2d]
              "
            />

            {/* Content */}
            <div className="mx-auto max-w-[850px] text-center">
              {/* Eyebrow */}
              <p className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#bf9550] sm:text-[10px]">
                WHO WE ARE
              </p>

              {/* Heading */}
              <h2
                className="
                  mt-4
                  text-[32px]
                  font-light
                  leading-[1.15]
                  tracking-[-0.01em]
                  text-[#202020]
                  sm:text-[35px]
                  lg:text-[39px]
                "
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                }}
              >
                Heritage Design.
                <span className="ml-2 italic font-light text-[#c59b5b]">
                  Own Manufacturing.
                </span>
              </h2>

              {/* Divider */}
              <div className="mx-auto mt-4 h-px w-12 bg-[#c59b5b]" />

              {/* Description */}
              <p className="mx-auto mt-5 max-w-[760px] text-[13px] leading-[1.85] text-[#505050] sm:text-[13.5px]">
                His Masterpiece is a design-led textile house rooted in India’s
                craft traditions. We create handcrafted home furnishings
                inspired by landscapes, gardens, and cultural stories, blending
                heritage design with contemporary craftsmanship.
              </p>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/about"
                  className="
                    border
                    border-[#222]
                    px-7
                    py-[10px]
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#222]
                    transition-all
                    duration-300
                    hover:bg-[#222]
                    hover:text-white
                  "
                >
                  Our Story
                </Link>

                <Link
                  to="/wholesale"
                  className="
                    bg-[#23392d]
                    px-7
                    py-[10px]
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#17271f]
                  "
                >
                  Trade Partnership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
