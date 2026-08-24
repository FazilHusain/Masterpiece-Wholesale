import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "/images/no-image.webp";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group block"
    >
      {/* Image */}

      <div className="relative overflow-hidden rounded-sm bg-[#f3f1ec]">

        <img
          src={category.image || FALLBACK_IMAGE}
          alt={category.name}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
          className="
            h-[320px]
            w-full
            object-cover
            transition-all
            duration-700
            ease-out
            group-hover:scale-[1.05]
          "
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Content */}

        <div className="absolute bottom-0 left-0 w-full p-7">

          <p className="text-[10px] uppercase tracking-[0.28em] text-white/75">
            Signature Collection
          </p>

          <h3
            className="mt-2 text-[30px] leading-none text-white"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            {category.name}
          </h3>

          <p className="mt-2 text-sm text-white/75">
            {category.description}
          </p>

          <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">

            <span>View Collection</span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}