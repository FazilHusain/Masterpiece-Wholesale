import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    number: "I",
    title: "The Trade Program",
    description:
      "Structured wholesale access with tiered pricing, look books, seasonal pre-order windows and dedicated trade support built for retailers who value long-term partnerships.",
  },
  {
    number: "II",
    title: "Own Manufacturing & Heritage Design",
    description:
      "Every design and production process happens in our own studio, ensuring premium quality, authentic craftsmanship and reliable delivery timelines.",
  },
  {
    number: "III",
    title: "Partner with Us",
    description:
      "Work directly with our team for OEM manufacturing, private label production and long-term partnerships across international markets.",
  },
  {
    number: "IV",
    title: "Craft & Sustainability",
    description:
      "Responsibly sourced materials, ethical production methods and handcrafted detailing that celebrates timeless Indian craftsmanship.",
  },
];

export default function TradeCards() {
  return (
    <section className="bg-[#f7f5f0] px-4 pb-10 pt-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="
                group
                relative
                border
                border-[#c8a76b]
                bg-[#fcfbf8]
                p-[5px]
                transition-all
                duration-500
                hover:-translate-y-1
              "
            >
              {/* Inner Frame */}
              <div
                className="
                  flex
                  h-full
                  min-h-[355px]
                  flex-col
                  border
                  border-[#e7d4aa]
                  px-5
                  py-7
                  sm:px-6
                  sm:py-8
                "
              >
                {/* Number */}
                <span
                  className="
                    text-[9px]
                    font-normal
                    uppercase
                    tracking-[0.3em]
                    text-[#c59b5b]
                  "
                >
                  {card.number}
                </span>

                {/* Small Gold Divider */}
                <div className="mt-5 h-px w-9 bg-[#c59b5b]" />

                {/* Title */}
                <h3
                  className="
                    mt-5
                    text-[22px]
                    font-light
                    leading-[1.25]
                    text-[#171717]
                    sm:text-[23px]
                  "
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 400,
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-4
                    text-[12px]
                    leading-[1.8]
                    text-[#626262]
                  "
                >
                  {card.description}
                </p>

                {/* Link */}
                <div className="mt-auto pt-6">
                  <Link
                    to="/wholesale"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#9f7948]
                      transition-all
                      duration-300
                      hover:gap-3
                    "
                  >
                    Learn More
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>

              {/* Bottom Gold Hover Line */}
              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-[#c59b5b]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}