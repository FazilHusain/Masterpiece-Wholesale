import { Link } from "react-router-dom";

export default function HomeProductCard({ product }) {
  const firstVariant = product?.variants?.find(
    (variant) => variant?.isActive !== false
  );

  const price = firstVariant?.price;

  const stock = firstVariant?.stock;

  return (
    <article className="group min-w-0">
      {/* Product Image */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-[#f5f3ee]"
      >
        <div className="aspect-[0.75] w-full">
          <img
            src={
              product.thumbnail ||
              product.featuredImage ||
              product.gallery?.[0]?.url ||
              "/images/placeholder.webp"
            }
            alt={product.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.025]
            "
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.webp";
            }}
          />
        </div>

        {/* NEW Badge */}
        {product.isNewArrival && (
          <span
            className="
              absolute
              left-3
              top-3
              bg-[#203529]
              px-2.5
              py-1.5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-white
            "
          >
            New
          </span>
        )}

        {/* Hover Overlay */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/5
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        >
          <span
            className="
              bg-white/90
              px-6
              py-3
              text-[9px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-[#bca06b]
              shadow-sm
              transition-transform
              duration-500
              group-hover:scale-100
              scale-95
            "
          >
            View Product
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-3">

        {/* Product Name */}
        <Link
          to={`/products/${product.slug}`}
          className="
            block
            font-[Cormorant_Garamond]
            text-[15px]
            leading-[1.35]
            text-[#1d1d1d]
            transition-colors
            duration-300
            hover:text-[#9d7748]
          "
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          {product.name}
        </Link>

        {/* SKU */}
        {product.sku && (
          <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-[#a0a0a0]">
            {product.sku}
          </p>
        )}

        {/* Price */}
        {price !== undefined && price !== null && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[14px] font-medium text-[#171717]">
              ${Number(price).toFixed(2)}
            </span>
          </div>
        )}

        {/* Stock */}
        {stock > 0 && (
          <div className="mt-2">
            <span
              className="
                inline-flex
                bg-[#edf5ed]
                px-2.5
                py-1.5
                text-[8px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#315b3a]
              "
            >
              In Stock
            </span>
          </div>
        )}
      </div>
    </article>
  );
}