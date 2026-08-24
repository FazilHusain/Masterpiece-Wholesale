import { ArrowRight } from "lucide-react";

const process = [
  {
    no: "01",
    title: "Design",
    desc: "Original patterns are created in our studio, inspired by India's craft traditions and timeless interiors.",
  },
  {
    no: "02",
    title: "Dye",
    desc: "Natural and carefully selected dyes are developed to achieve rich colours with lasting beauty.",
  },
  {
    no: "03",
    title: "Weave & Print",
    desc: "Every textile is woven and printed by skilled artisans using techniques refined over generations.",
  },
  {
    no: "04",
    title: "Quality",
    desc: "Each piece passes through detailed quality inspection before becoming part of every collection.",
  },
];

export default function CraftProcess() {
  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-xl">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#B68C2F]">
            HOW WE MAKE
          </span>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-tight text-[#183425] sm:text-[38px] lg:text-[42px]">
            The Craft <span className="italic">Process</span>
          </h2>

          <p className="mt-4 text-[14px] leading-7 text-[#6B6259]">
            Every His Masterpiece product passes through a considered process
            of design, craft and quality.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {process.map((item, index) => (
            <div
              key={item.no}
              className="relative flex items-center"
            >
              <div className="group flex min-h-[205px] w-full flex-col items-center justify-center bg-white px-6 py-7 text-center transition-all duration-500 hover:-translate-y-1">

                <span className="font-cormorant text-[22px] text-[#B68C2F]">
                  {item.no}
                </span>

                <h3 className="mt-3 font-cormorant text-[20px] font-normal text-[#183425]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-[#6B6259]">
                  {item.desc}
                </p>

              </div>

              {index !== process.length - 1 && (
                <ArrowRight
                  size={16}
                  strokeWidth={1.3}
                  className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-[#B68C2F] xl:block"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}