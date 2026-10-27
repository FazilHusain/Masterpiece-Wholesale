import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "The Trade Program",
    description:
      "Wholesale access with tiered pricing, seasonal collections and dedicated trade support.",
  },
  {
    title: "Own Manufacturing & Heritage Design",
    description:
      "In-house design and production ensuring quality, authentic craftsmanship and reliable delivery.",
  },
  {
    title: "Partner with Us",
    description:
      "OEM, private label and long-term partnerships for international markets.",
  },
  {
    title: "Craft & Sustainability",
    description:
      "Responsibly sourced materials and handcrafted detailing rooted in Indian craftsmanship.",
  },
];

export default function TradeCards() {
  return (
    <section className="bg-[#f7f5f0] px-4 pb-8 pt-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="
                group relative border border-[#c8a76b]
                bg-[#fcfbf8] p-[4px]
                transition-all duration-500
                hover:-translate-y-1
              "
            >
              <div
                className="
                  flex h-full min-h-[205px] flex-col
                  border border-[#e7d4aa]
                  px-4 py-4
                "
              >
                <div className="mt-1 h-px w-8 bg-[#c59b5b]" />

                <h3
                  className="
                    mt-3 text-[19px] font-light
                    leading-[1.2] text-[#171717]
                  "
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 400,
                  }}
                >
                  {card.title}
                </h3>

                <p className="mt-3 text-[12px] leading-[1.65] text-[#626262]">
                  {card.description}
                </p>

                <div className="mt-auto pt-3">
                  <Link
                    to="/wholesale"
                    className="
                      inline-flex items-center gap-2
                      text-[9px] font-semibold uppercase
                      tracking-[0.16em] text-[#9f7948]
                      transition-all duration-300
                      hover:gap-3
                    "
                  >
                    Learn More
                    <ArrowRight
                      size={13}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>

              <span
                className="
                  absolute bottom-0 left-0 h-[2px] w-0
                  bg-[#c59b5b] transition-all duration-500
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