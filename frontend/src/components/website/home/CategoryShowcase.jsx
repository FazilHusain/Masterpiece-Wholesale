import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebsiteProducts } from "../../../redux/websiteProduct";

const categorySections = [
  {
    id: "bedsheets",
    eyebrow: "BED LINEN",
    title: "Luxury Bedsheets",
    highlight: "Timeless Comfort",
    description:
      "Explore refined bedsheets crafted from premium fabrics with elegant patterns, soft textures and timeless craftsmanship.",
    image: "/images/categories/bedsheets-banner.webp",
    buttonText: "Explore Bedsheets",
    buttonLink: "/categories/bedsheets",
  },

  {
    id: "cushions",
    eyebrow: "LIVING",
    title: "Statement Cushions",
    highlight: "Artisan Details",
    description:
      "Bring character to every space with handcrafted cushions featuring rich textures, refined patterns and luxurious finishes.",
    image: "/images/categories/cushions-banner.webp",
    buttonText: "Explore Cushions",
    buttonLink: "/categories/cushions",
  },

  {
    id: "table-linen",
    eyebrow: "DINING",
    title: "Table Linen",
    highlight: "Crafted for Gatherings",
    description:
      "Elevate dining spaces with sophisticated table runners, napkins and linens created for beautiful everyday moments.",
    image: "/images/categories/table-linen-banner.webp",
    buttonText: "Explore Table Linen",
    buttonLink: "/categories/table-linen",
  },

  {
    id: "duvet-covers",
    eyebrow: "BEDDING",
    title: "Duvet Covers",
    highlight: "Elegant Layers",
    description:
      "Discover premium duvet covers designed with expressive prints, soft fabrics and effortless luxury for modern interiors.",
    image: "/images/categories/duvet-banner.webp",
    buttonText: "Explore Duvet Covers",
    buttonLink: "/categories/duvet-covers",
  },

  {
    id: "curtains",
    eyebrow: "WINDOWS",
    title: "Curtains & Drapes",
    highlight: "Frame Your Space",
    description:
      "Transform interiors with beautifully crafted curtains and drapes that balance natural textures, elegant patterns and function.",
    image: "/images/categories/curtains-banner.webp",
    buttonText: "Explore Curtains",
    buttonLink: "/categories/curtains",
  },
];

function ProductCard({ product }) {
  /*
   * Product API structure:
   *
   * product._id
   * product.name
   * product.slug
   * product.sku
   * product.category.slug
   * product.featuredImage
   * product.variants[0].price
   * product.isNew
   */

  const productPrice =
    product?.variants?.length > 0
      ? product.variants[0]?.price
      : null;

  const productImage =
    product?.featuredImage ||
    product?.gallery?.[0]?.url ||
    "/images/products/product-placeholder.webp";

  const productBadge = product?.isNew
    ? "NEW"
    : "";

  return (
    <article className="group min-w-0">
      <Link
        to={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-[#f5f3ee]"
      >
        <div className="aspect-[0.78] w-full">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        </div>

        {productBadge && (
          <span className="absolute left-3 top-3 bg-[#203529] px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white">
            {productBadge}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="bg-white/90 px-6 py-3 text-[9px] uppercase tracking-[0.2em] text-[#9d7748]">
            View Product
          </span>
        </div>
      </Link>

      <div className="pt-3">
        <Link
          to={`/products/${product.slug}`}
          className="block text-[15px] leading-[1.35] text-[#1d1d1d] hover:text-[#9d7748]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          {product.name}
        </Link>

        <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-[#999]">
          {product.sku}
        </p>

        {productPrice !== null && (
          <p className="mt-2 text-[13px] text-[#222]">
            ${productPrice}
          </p>
        )}

        <span className="mt-2 inline-flex bg-[#edf5ed] px-2.5 py-1.5 text-[8px] uppercase tracking-[0.16em] text-[#315b3a]">
          In Stock
        </span>
      </div>
    </article>
  );
}

export default function CategoryShowcase() {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
  } = useSelector((state) => state.websiteProduct);

  /*
   * Fetch ALL products once.
   */
  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchWebsiteProducts());
    }
  }, [dispatch, products?.length]);

  return (
    <section className="bg-white">

      {categorySections.map((section, index) => {

        /*
         * ==============================
         * Dynamic Category Products
         * ==============================
         *
         * section.id:
         * bedsheets
         * cushions
         * table-linen
         * duvet-covers
         * curtains
         *
         * API:
         * product.category.slug
         *
         * Take only first 4.
         */

        const categoryProducts = products
          .filter(
            (product) =>
              product?.category?.slug === section.id
          )
          .slice(0, 4);

        return (
          <div
            key={section.id}
            className={
              index === 0
                ? "pt-0"
                : "pt-16 lg:pt-20"
            }
          >

            {/* ================= BANNER ================= */}

            <div className="grid min-h-[340px] grid-cols-1 lg:grid-cols-[42%_58%]">

              {/* Image */}

              <div className="relative order-2 min-h-[300px] overflow-hidden lg:order-1 lg:min-h-[390px]">
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content */}

              <div className="order-1 flex items-center bg-[#203529] px-8 py-12 sm:px-12 lg:order-2 lg:px-16">
                <div className="max-w-[540px]">

                  <p className="text-[9px] uppercase tracking-[0.38em] text-[#d3a44f]">
                    {section.eyebrow}
                  </p>

                  <h2
                    className="mt-4 text-[38px] font-light leading-[1.05] text-white sm:text-[44px] lg:text-[48px]"
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                    }}
                  >
                    {section.title}

                    <span className="ml-2 italic text-[#d3a44f]">
                      {section.highlight}
                    </span>
                  </h2>

                  <p className="mt-5 max-w-[500px] text-[12px] leading-[1.9] text-white/80">
                    {section.description}
                  </p>

                  <Link
                    to={section.buttonLink}
                    className="mt-7 inline-flex h-[44px] items-center justify-center bg-[#b8862b] px-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#a4741d]"
                  >
                    {section.buttonText}
                  </Link>

                </div>
              </div>
            </div>

            {/* ================= PRODUCTS ================= */}

            <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-14">

              {loading ? (
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map(
                    (_, skeletonIndex) => (
                      <div
                        key={skeletonIndex}
                        className="animate-pulse"
                      >
                        <div className="aspect-[0.78] bg-[#f5f3ee]" />

                        <div className="pt-3">
                          <div className="h-5 w-4/5 bg-[#f1eee9]" />
                          <div className="mt-2 h-2 w-2/5 bg-[#f1eee9]" />
                          <div className="mt-3 h-3 w-1/4 bg-[#f1eee9]" />
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : categoryProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-sm text-gray-400">
                  No products available in this category.
                </div>
              )}

              <div className="mt-8 flex justify-center border-t border-[#e7e2da] pt-8">
                <Link
                  to={section.buttonLink}
                  className="border border-[#222] px-7 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#222] transition hover:bg-[#222] hover:text-white"
                >
                  View All His Masterpiece{" "}
                  {section.title} →
                </Link>
              </div>

            </div>
          </div>
        );
      })}
    </section>
  );
}