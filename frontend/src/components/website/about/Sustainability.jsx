import { Link } from "react-router-dom";

const sustainabilityPoints = [
  "Natural and low-impact dyes where possible",
  "Fair wages and safe working conditions for all artisans",
  "Minimal packaging using recycled materials",
  "Long-lasting designs built to be kept, not thrown away",
  "Support for traditional craft communities",
];

const gallery = [
  "/images/about/sustainability-1.jpg",
  "/images/about/sustainability-2.jpg",
  "/images/about/sustainability-3.jpg",
  "/images/about/sustainability-4.jpg",
];

export default function Sustainability() {
  return (
    <section className="bg-[#183425] py-14 sm:py-16 lg:py-18">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">

        {/* Left */}
        <div className="max-w-[500px]">
          <span className="text-[9px] font-medium uppercase tracking-[0.45em] text-[#B68C2F]">
            RESPONSIBILITY
          </span>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-[1.05] text-white sm:text-[38px] lg:text-[42px]">
            Craft &{" "}
            <span className="italic">
              Sustainability
            </span>
          </h2>

          <p className="mt-5 text-[14px] leading-7 font-light text-[#D7DDD9]">
            We believe beautiful things should be made responsibly. Our
            commitment to sustainability runs through every decision we make —
            from the fibres we use to the people we work with.
          </p>

          <ul className="mt-6 space-y-2.5">
            {sustainabilityPoints.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <span className="mt-[2px] text-[13px] text-[#B68C2F]">
                  ✓
                </span>

                <span className="text-[14px] leading-6 text-[#D6DDD8]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/journal"
            className="mt-7 inline-flex bg-[#B68C2F] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#946C14]"
          >
            Read Our Journal
          </Link>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-3">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden bg-white shadow-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={image}
                  alt={`Sustainability ${index + 1}`}
                  loading="lazy"
                  className="h-[180px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[220px] lg:h-[265px]"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}