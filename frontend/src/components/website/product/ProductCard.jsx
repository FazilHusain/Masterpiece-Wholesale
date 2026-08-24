import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";

export default function ProductCard({
  product,
  isSampleMode = false,
}) {
  const FALLBACK_IMAGE = "/images/no-image.webp";

  const handleImageError = (e) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const productUrl = isSampleMode
    ? `/sample-request/${product.slug}`
    : `/products/${product.slug}`;

  // ==========================================
  // IMAGE
  // ==========================================

  const productImage =
    product?.featuredImage ||
    product?.thumbnail ||
    product?.gallery?.[0]?.url ||
    FALLBACK_IMAGE;

  // ==========================================
  // PRICE
  // ==========================================

  const prices = Array.isArray(product?.variants)
    ? product.variants
        .map((variant) => Number(variant?.price))
        .filter((price) => Number.isFinite(price) && price > 0)
    : [];

  const sellingPrice =
    prices.length > 0
      ? Math.min(...prices)
      : Number(product?.sellingPrice || 0);

  // ==========================================
  // MRP
  // ==========================================

  const mrp = Number(product?.mrp || 0);

  // ==========================================
  // STOCK
  // ==========================================

  const totalStock = Array.isArray(product?.variants)
    ? product.variants.reduce(
        (total, variant) =>
          total + Number(variant?.stock || 0),
        0
      )
    : Number(product?.stock || 0);

  const isInStock = totalStock > 0;

  // ==========================================
  // NEW
  // ==========================================

  const isNew =
    product?.isNewArrival ||
    product?.isNew;

  return (
    <article className="group overflow-hidden bg-white">

      {/* ======================================
          IMAGE
      ====================================== */}

      <div className="relative overflow-hidden bg-[#F8F6F2]">

        {/* New Badge */}

        {isNew && (
          <span className="absolute left-3 top-3 z-20 bg-[#B8862B] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white">
            New
          </span>
        )}

        {/* Hover Icons */}

        <div className="absolute right-3 top-3 z-20 flex translate-x-6 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">

          <button
            type="button"
            aria-label="Add to wishlist"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-[#B8862B] hover:text-white"
          >
            <Heart size={15} />
          </button>

          <Link
            to={productUrl}
            aria-label="View product"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-[#B8862B] hover:text-white"
          >
            <Eye size={15} />
          </Link>

        </div>

        {/* Product Image */}

        <Link to={productUrl} className="block">

          <img
            src={productImage}
            alt={product?.name || "Product"}
            loading="lazy"
            onError={handleImageError}
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
          />

        </Link>

        {/* Overlay */}

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/5" />

        {/* Bottom Actions */}

        <div className="absolute bottom-3 left-1/2 flex w-[88%] -translate-x-1/2 translate-y-8 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

          <Link
            to={productUrl}
            className="flex-1 bg-white py-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.15em] text-[#183425] transition hover:bg-[#B8862B] hover:text-white"
          >
            {isSampleMode
              ? "Request Sample"
              : "View"}
          </Link>

          <button
            type="button"
            className="flex-1 bg-[#183425] py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#B8862B]"
            onClick={() =>
              console.log("Add Quote", product)
            }
          >
            Add Quote
          </button>

        </div>
      </div>

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="px-3.5 py-5 sm:px-4 sm:py-6">

        {/* Category */}

        {product?.category?.name && (
          <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#B8862B]">
            {product.category.name}
          </p>
        )}

        {/* Product Name */}

        <Link
          to={productUrl}
          className="mt-2 block"
        >
          <h3 className="line-clamp-2 font-cormorant text-[22px] leading-[1.05] text-[#183425] transition duration-300 group-hover:text-[#B8862B]">
            {product?.name}
          </h3>
        </Link>

        {/* SKU */}

        {product?.sku && (
          <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-gray-500">
            SKU: {product.sku}
          </p>
        )}

        {/* Rating */}

        <div className="mt-3 flex items-center gap-2">

          <span className="text-[11px] tracking-[1px] text-[#D4A017]">
            ★★★★★
          </span>

          <span className="text-[10px] text-gray-500">
            ({product?.reviewCount || 0})
          </span>

        </div>

        {/* ==================================
            PRICE
        ================================== */}

        {sellingPrice > 0 ? (
          <div className="mt-4 flex items-center gap-2">

            <span className="text-[16px] font-semibold text-[#183425]">
              ${sellingPrice.toFixed(2)}
            </span>

            {mrp > sellingPrice && (
              <span className="text-[12px] text-gray-400 line-through">
                ${mrp.toFixed(2)}
              </span>
            )}

          </div>
        ) : (
          <div className="mt-4 text-[13px] font-medium text-[#183425]">
            Price on Request
          </div>
        )}

        {/* ==================================
            STOCK
        ================================== */}

        <div className="mt-3 flex items-center gap-1.5">

          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isInStock
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          <span
            className={`text-[9px] uppercase tracking-[0.14em] ${
              isInStock
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {isInStock
              ? "In Stock"
              : "Out Of Stock"}
          </span>

        </div>

        {/* Divider */}

        <div className="my-4 h-px bg-[#E8E2D8]" />

        {/* View Product */}

        <Link
          to={productUrl}
          className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#183425] transition duration-300 group-hover:text-[#B8862B]"
        >
          {isSampleMode
            ? "Request Sample"
            : "View Product"}

          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>

        </Link>

      </div>
    </article>
  );
}