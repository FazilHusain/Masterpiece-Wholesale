import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebsiteProducts } from "../../../redux/websiteProduct";

const categorySections = [
  {
    id: "bed-sheets",
    eyebrow: "BED LINEN",
    title: "Luxury Bedsheets",
    highlight: "Timeless Comfort",
    description:
      "Premium bedsheets with elegant patterns, soft textures and timeless craftsmanship.",
    image: "/images/categories/bedsheet.jpg",
    buttonText: "Explore Bedsheets",
    buttonLink: "/categories/bed-sheets",
  },

  {
    id: "cushions",
    eyebrow: "LIVING",
    title: "Statement Cushions",
    highlight: "Artisan Details",
    description:
      "Handcrafted cushions with rich textures, refined patterns and luxurious finishes.",
    image: "/images/categories/cushion.jpg",
    buttonText: "Explore Cushions",
    buttonLink: "/categories/cushions",
  },

  {
    id: "table-runners",
    eyebrow: "DINING",
    title: "Table Linen",
    highlight: "Crafted for Gatherings",
    description:
      "Sophisticated table runners, napkins and linens for beautiful everyday moments.",
    image: "/images/categories/table-linen.jpg",
    buttonText: "Explore Table Linen",
    buttonLink: "/categories/table-runners",
  },

  {
    id: "duvet-covers",
    eyebrow: "BEDDING",
    title: "Duvet Covers",
    highlight: "Elegant Layers",
    description:
      "Premium duvet covers with expressive prints, soft fabrics and effortless luxury.",
    image: "/images/categories/duvet-cover.jpg",
    buttonText: "Explore Duvet Covers",
    buttonLink: "/categories/duvet-covers",
  },

  {
    id: "curtains",
    eyebrow: "WINDOWS",
    title: "Curtains & Drapes",
    highlight: "Frame Your Space",
    description:
      "Beautifully crafted curtains and drapes blending texture, elegance and function.",
    image: "/images/categories/curtain.jpg",
    buttonText: "Explore Curtains",
    buttonLink: "/categories/curtains",
  },
];

function ProductCard({ product }) {
  const productPrice =
    product?.variants?.length > 0
      ? product.variants[0]?.price
      : null;

  const productImage =
    product?.featuredImage ||
    product?.gallery?.[0]?.url ||
    "/images/products/product-placeholder.webp";

  const productBadge = product?.isNew ? "NEW" : "";

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

        {/* <span className="mt-2 inline-flex bg-[#edf5ed] px-2.5 py-1.5 text-[8px] uppercase tracking-[0.16em] text-[#315b3a]">
          In Stock
        </span> */}
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
         * Dynamic Category Products
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

            {/* Exact 50% Image + 50% Content */}
            <div className="grid min-h-[340px] grid-cols-1 lg:grid-cols-2">

              {/* ================= IMAGE ================= */}

              <div className="relative order-2 min-h-[300px] overflow-hidden lg:order-1 lg:min-h-[350px]">
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* ================= CONTENT ================= */}

              <div className="order-1 flex items-center bg-[#203529] px-7 py-10 sm:px-10 lg:order-2 lg:px-12 xl:px-14">
                <div className="max-w-[500px]">

                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#d3a44f]">
                    {section.eyebrow}
                  </p>

                  <h2
                    className="mt-4 text-[36px] font-light leading-[1.05] text-white sm:text-[42px] lg:text-[44px]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    {section.title}

                    <span className="ml-2 italic text-[#d3a44f]">
                      {section.highlight}
                    </span>
                  </h2>

                  <p className="mt-4 max-w-[460px] text-[12.5px] leading-[1.75] text-white/80">
                    {section.description}
                  </p>

                  <Link
                    to={section.buttonLink}
                    className="mt-6 inline-flex h-[43px] items-center justify-center bg-[#b8862b] px-6 text-[9px] font-semibold uppercase tracking-[0.17em] text-white transition hover:bg-[#a4741d]"
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
                  className="border border-[#222] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#222] transition hover:bg-[#222] hover:text-white"
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