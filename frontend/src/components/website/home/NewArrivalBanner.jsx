import { Link } from "react-router-dom";

const banner = {
  title: "Songs Of Spring",
  subtitle: "NEW ARRIVAL • LATEST COLLECTION",
  description:
  "Explore botanical florals, artisan craftsmanship and premium home textiles.",
  desktopImage: "/images/hero/newarrival.webp",
  mobileImage: "/images/hero/newarrival.webp",
  buttonText: "Shop New Arrivals",
  buttonLink: "/products?type=new-arrival",
  secondaryButtonText: "Get Wholesale Pricing",
  secondaryButtonLink: "/wholesale",
};

export default function NewArrivalBanner() {
  return (
    <section className="w-full bg-white py-8 lg:py-10">
      <div className="w-full overflow-hidden">
        {/* 50% LEFT + 50% RIGHT */}
        <div className="grid min-h-[350px] grid-cols-1 lg:grid-cols-2">

          {/* ================= LEFT ================= */}

          <div
            className="
              relative
              flex
              items-center
              bg-[#203529]
              px-7
              py-9
              sm:px-9
              lg:px-11
              lg:py-9
              xl:px-14
            "
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,.025) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-[#183126]/10" />

            <div className="relative z-10 max-w-[500px]">

              {/* Subtitle */}

              <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#d3a44f] sm:text-[10px]">
                {banner.subtitle}
              </p>

              {/* Heading */}

              <h2
                className="
                  mt-4
                  text-[36px]
                  font-light
                  leading-[1.05]
                  text-white
                  sm:text-[40px]
                  lg:text-[43px]
                  xl:text-[46px]
                "
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                }}
              >
                Songs of{" "}
                <span className="italic text-[#d3a44f]">
                  Spring
                </span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-4
                  max-w-[460px]
                  text-[12.5px]
                  leading-[1.75]
                  text-white/80
                "
              >
                {banner.description}
              </p>

              {/* Buttons */}

              <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  to={banner.buttonLink}
                  className="
                    inline-flex
                    h-[43px]
                    min-w-[175px]
                    items-center
                    justify-center
                    bg-[#b8862b]
                    px-5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.17em]
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#a4741d]
                  "
                >
                  {banner.buttonText}
                </Link>

                <Link
                  to={banner.secondaryButtonLink}
                  className="
                    inline-flex
                    h-[43px]
                    min-w-[175px]
                    items-center
                    justify-center
                    border
                    border-white/45
                    px-5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.17em]
                    text-white
                    transition-all
                    duration-300
                    hover:border-white
                    hover:bg-white
                    hover:text-[#203529]
                  "
                >
                  {banner.secondaryButtonText}
                </Link>

              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="relative min-h-[280px] lg:min-h-[350px]">

            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={banner.mobileImage}
              />

              <img
                src={banner.desktopImage}
                alt={banner.title}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            </picture>

            {/* Image overlay */}

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 bg-gradient-to-r from-[#203529]/35 via-transparent to-transparent" />

          </div>
        </div>
      </div>
    </section>
  );
}