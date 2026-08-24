import { Link } from "react-router-dom";

const banner = {
  title: "Songs Of Spring",
  subtitle: "NEW ARRIVAL • LATEST COLLECTION",
  description:
    "Build your spring inventory with our newest collection featuring botanical florals, artisan craftsmanship and premium home textiles for retailers worldwide.",
  desktopImage: "/images/hero/newarrival.webp",
  mobileImage: "/images/hero/newarrival.webp",
  buttonText: "Shop New Arrivals",
  buttonLink: "/products?type=new-arrival",
  secondaryButtonText: "Get Wholesale Pricing",
  secondaryButtonLink: "/wholesale",
};

export default function NewArrivalBanner() {
  return (
    <section className="w-full bg-white py-10 lg:py-12">
      <div className="w-full overflow-hidden">
        <div className="grid min-h-[380px] grid-cols-1 lg:grid-cols-[58%_42%]">

          {/* ================= LEFT ================= */}

          <div
            className="
              relative
              flex
              items-center
              bg-[#203529]
              px-8
              py-12
              sm:px-10
              lg:px-14
              lg:py-12
              xl:px-16
            "
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,.025) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            {/* subtle dark overlay */}
            <div className="absolute inset-0 bg-[#183126]/10" />

            <div className="relative z-10 max-w-[560px]">

              {/* Subtitle */}

              <p className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#d3a44f] sm:text-[10px]">
                {banner.subtitle}
              </p>

              {/* Heading */}

              <h2
                className="
                  mt-5
                  text-[38px]
                  font-light
                  leading-[1.05]
                  text-white
                  sm:text-[42px]
                  lg:text-[46px]
                  xl:text-[48px]
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
                  mt-5
                  max-w-[500px]
                  text-[12px]
                  leading-[1.9]
                  text-white/80
                  sm:text-[13px]
                "
              >
                {banner.description}
              </p>

              {/* Buttons */}

              <div className="mt-7 flex flex-wrap gap-3">

                <Link
                  to={banner.buttonLink}
                  className="
                    inline-flex
                    h-[46px]
                    min-w-[190px]
                    items-center
                    justify-center
                    bg-[#b8862b]
                    px-6
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
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
                    h-[46px]
                    min-w-[190px]
                    items-center
                    justify-center
                    border
                    border-white/45
                    px-6
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
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

          <div className="relative min-h-[300px] lg:min-h-[380px]">

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

            {/* Reference-style overlay */}

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 bg-gradient-to-r from-[#203529]/35 via-transparent to-transparent" />

          </div>
        </div>
      </div>
    </section>
  );
}