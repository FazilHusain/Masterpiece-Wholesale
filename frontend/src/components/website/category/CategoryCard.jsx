import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FALLBACK_IMAGE = "/images/no-image.webp";

const CategoryCard = ({ category }) => {
  const categoryLink = `/categories/${category.slug}`;

  return (
    <article className="group overflow-hidden bg-white">

      {/* Image */}
      <Link
        to={categoryLink}
        className="block overflow-hidden"
      >
        <img
          src={category.image || FALLBACK_IMAGE}
          alt={category.name}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-6 sm:p-7">

        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B68C2F]">
          Category
        </p>

        <Link to={categoryLink}>
          <h3 className="mt-2 font-cormorant text-[28px] leading-tight text-[#183425] transition duration-300 group-hover:text-[#B68C2F] sm:text-[30px]">
            {category.name}
          </h3>
        </Link>

        {category.shortDescription && (
          <p className="mt-3 line-clamp-3 text-[14px] leading-7 text-[#6B6259]">
            {category.shortDescription}
          </p>
        )}

        <Link
          to={categoryLink}
          className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#183425] transition duration-300 hover:text-[#B68C2F]"
        >
          Explore

          <ChevronRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

      </div>
    </article>
  );
};

export default CategoryCard;