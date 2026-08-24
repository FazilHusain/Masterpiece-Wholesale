import { Factory, Palette, Leaf, Handshake } from "lucide-react";

const pillars = [
  {
    icon: Factory,
    title: "Own Manufacturing",
    description:
      "All production happens in our own studio. No third-party intermediaries — direct quality control from concept to delivery, every time.",
  },
  {
    icon: Palette,
    title: "Original Design",
    description:
      "Every pattern and textile in our collections is designed in-house. Our collections are exclusively ours — you won't find them anywhere else.",
  },
  {
    icon: Leaf,
    title: "Heritage Craft",
    description:
      "We work with artisans who have spent generations perfecting traditional weaving, dyeing and embroidery techniques rooted in Indian craft heritage.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    description:
      "We build retail partnerships with reorder availability, seasonal collections and dedicated trade support.",
  },
];

export default function OurPillars() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            WHAT WE STAND FOR
          </p>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-tight text-[#183425] sm:text-[38px] lg:text-[42px]">
            Four <span className="italic">Pillars</span>
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid gap-y-8 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`
                  group relative px-5 py-2
                  transition-all duration-500
                  xl:border-r xl:border-[#ECE6DC]
                  ${index === 3 ? "xl:border-r-0" : ""}
                `}
              >
                {/* Gold Line */}
                <span className="absolute left-0 top-0 h-px w-0 bg-[#B68C2F] transition-all duration-500 group-hover:w-full" />

                {/* Icon */}
                <div className="mb-4 inline-flex transition duration-500 group-hover:-translate-y-1">
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#B68C2F] transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h3 className="font-cormorant text-[20px] font-normal leading-snug text-[#183425] transition duration-500 group-hover:translate-x-1">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-[14px] leading-7 text-[#6B6259]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}