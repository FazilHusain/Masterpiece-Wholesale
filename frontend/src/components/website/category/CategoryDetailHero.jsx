import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FALLBACK_IMAGE = "/images/no-image.webp";

const CategoryDetailHero = ({ category }) => {
  return (
    <section className="relative h-[300px] overflow-hidden sm:h-[340px] lg:h-[390px]">

      {/* Background */}
      <img
        src={category?.image || FALLBACK_IMAGE}
        alt={category?.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 lg:px-8">

        <div className="max-w-2xl text-white">

          {/* Breadcrumb */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-white/70">
            <Link
              to="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={13} />

            <Link
              to="/categories"
              className="transition hover:text-white"
            >
              Categories
            </Link>

            <ChevronRight size={13} />

            <span className="text-[#B68C2F]">
              {category?.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-cormorant text-[38px] font-normal leading-[1.05] sm:text-[44px] lg:text-[50px]">
            {category?.name}
          </h1>

          {/* Description */}
          {category?.shortDescription && (
            <p className="mt-4 max-w-xl text-[13px] leading-6 text-white/80 sm:text-[14px] sm:leading-7">
              {category.shortDescription}
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

export default CategoryDetailHero;