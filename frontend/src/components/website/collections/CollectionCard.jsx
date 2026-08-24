import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="group block"
    >
      {/* ================= IMAGE ================= */}

      <div className="aspect-[4/5] overflow-hidden bg-[#F1EEE8]">
        <img
          src={collection.thumbnailImage}
          alt={collection.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="pt-4">

        <h3
          className="text-[22px] leading-tight text-[#183425] transition-colors duration-300 group-hover:text-[#B68C2F]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          {collection.name}
        </h3>

        {collection.shortDescription && (
          <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#6B6259]">
            {collection.shortDescription}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B68C2F]">
          Explore

          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>

      </div>
    </Link>
  );
};

export default CollectionCard;