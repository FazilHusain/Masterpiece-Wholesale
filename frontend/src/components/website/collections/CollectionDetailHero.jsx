import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "/images/no-image.webp";

const CollectionDetailHero = ({ collection }) => {
  const bannerImage =
    collection?.bannerImage || FALLBACK_IMAGE;

  return (
    <section className="relative overflow-hidden">
      {/* ================= BANNER ================= */}

      <div className="relative aspect-[16/5.5] min-h-[280px] overflow-hidden sm:min-h-[320px] lg:min-h-[360px]">
        <img
          src={bannerImage}
          alt={collection?.name || "Collection"}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">

          {/* Breadcrumb */}

          <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-white/70 sm:text-[10px]">

            <Link
              to="/"
              className="transition-colors hover:text-[#B68C2F]"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/collections"
              className="transition-colors hover:text-[#B68C2F]"
            >
              Collections
            </Link>

            <span>/</span>

            <span className="max-w-[180px] truncate text-[#D0A85C]">
              {collection?.name}
            </span>

          </nav>

          {/* Collection Name */}

          <h1
            className="max-w-3xl text-[36px] font-medium leading-[1.05] text-white sm:text-[42px] lg:text-[50px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            {collection?.name}
          </h1>

          {/* Description */}

          {collection?.shortDescription && (
            <p className="mt-3 max-w-xl text-[11px] leading-5 text-white/75 sm:text-[12px] sm:leading-6">
              {collection.shortDescription}
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

export default CollectionDetailHero;