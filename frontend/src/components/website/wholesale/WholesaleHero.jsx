import { Check } from "lucide-react";

const features = [
  "Original Design-Led Collections",
  "Seasonal Pre-Order Windows",
  "Style Guides & Look Books",
  "Own Manufacturing – No Middlemen",
  "Min. Order $300.00",
  "WhatsApp Trade Support",
];

export default function WholesaleHero() {
  return (
    <section className="bg-[#193521]">
      <div className="mx-auto max-w-[1180px] px-6 py-12 text-center md:py-14">

        {/* Small Heading */}
        <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#c7a25a]">
          APPLY NOW
        </p>

        {/* Main Heading */}
        <h1
          className="mt-4 text-[40px] font-normal leading-[1] text-white md:text-[46px] lg:text-[52px]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          Wholesale{" "}
          <span className="italic text-[#c7a25a]">
            Partnership
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-[620px] text-[12px] leading-5 text-white/75 md:text-[13px]">
          Apply for trade access and start stocking His Masterpiece
          in your store or studio.
        </p>

        {/* Features */}
        <div className="mx-auto mt-10 flex max-w-[1050px] flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {features.map((item) => (
            <div
              key={item}
              className="flex items-center gap-1.5 whitespace-nowrap"
            >
              <Check
                size={12}
                strokeWidth={2}
                className="text-[#c7a25a]"
              />

              <span className="text-[10px] text-white/85 md:text-[11px]">
                {item}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}