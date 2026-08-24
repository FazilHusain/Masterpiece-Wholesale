import { useEffect, useState } from "react";

import {
  X,
  Search,
  Clock,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

import searchService from "../../../services/website/searchService";

const popularSearches = [
  "Bedsheets",
  "Comforters",
  "Blankets",
  "Curtains",
  "Pillows",
  "Bath Towels",
];

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /*
   * ==========================================
   * Search Products
   * ==========================================
   */

  useEffect(() => {
    const trimmedQuery = query.trim();

    // Empty search
    if (!trimmedQuery) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await searchService.search(
          trimmedQuery
        );

        console.log(
          "🔎 SEARCH RESPONSE =>",
          response
        );

        setProducts(response?.data || []);
      } catch (error) {
        console.error(
          "❌ SEARCH ERROR =>",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  /*
   * ==========================================
   * Escape Key + Body Scroll
   * ==========================================
   */

  useEffect(() => {
    if (!open) return;

    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [open, onClose]);

  /*
   * ==========================================
   * Popular Search
   * ==========================================
   */

  const handlePopularSearch = (search) => {
    setQuery(search);
  };

  /*
   * ==========================================
   * Clear Search
   * ==========================================
   */

  const handleClear = () => {
    setQuery("");
    setProducts([]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm">

      <div className="mx-auto mt-16 w-full max-w-5xl rounded-3xl bg-white shadow-2xl">

        {/* =========================
            Header
        ========================== */}

        <div className="flex items-center border-b px-8 py-6">

          <Search
            size={21}
            className="mr-4 shrink-0 text-gray-400"
          />

          <input
            autoFocus
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search products..."
            className="flex-1 bg-transparent text-[15px] font-medium outline-none placeholder:text-[#999]"
          />

          {/* Clear */}

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
            aria-label="Close search"
          >
            <X size={21} />
          </button>

        </div>

        {/* =========================
            Body
        ========================== */}

        <div className="grid grid-cols-1 gap-10 p-8 md:grid-cols-2">

          {/* =========================
              Popular Searches
          ========================== */}

          <div>

            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">

              <TrendingUp size={18} />

              Popular Searches

            </h3>

            <div className="flex flex-wrap gap-3">

              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    handlePopularSearch(item)
                  }
                  className={`
                    rounded-full
                    border
                    px-5
                    py-2
                    text-sm
                    transition
                    ${
                      query.toLowerCase() ===
                      item.toLowerCase()
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }
                  `}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* =========================
              Search Results
          ========================== */}

          <div>

            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">

              <Clock size={18} />

              {query
                ? "Search Results"
                : "Trending Products"}

            </h3>

            {/* Searching */}

            {loading && (
              <div className="space-y-4">

                {Array.from({ length: 3 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex animate-pulse items-center gap-3"
                    >

                      <div className="h-14 w-14 rounded-lg bg-gray-200" />

                      <div className="flex-1">

                        <div className="h-4 w-4/5 rounded bg-gray-200" />

                        <div className="mt-2 h-3 w-2/5 rounded bg-gray-200" />

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

            {/* No Search Yet */}

            {!loading && !query && (
              <p className="text-sm text-gray-500">
                Start typing to search products.
              </p>
            )}

            {/* No Products */}

            {!loading &&
              query &&
              products.length === 0 && (
                <p className="text-sm text-gray-500">
                  No products found for "{query}".
                </p>
              )}

            {/* Products */}

            {!loading &&
              products.length > 0 && (
                <div className="space-y-3">

                  {products
                    .slice(0, 6)
                    .map((product) => (

                      <Link
                        key={product._id}
                        to={`/products/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-[#ece7df] hover:bg-[#faf9f6]"
                      >

                        {/* Image */}

                        <img
                          src={
                            product.featuredImage ||
                            product.gallery?.[0]?.url ||
                            "/images/placeholder.webp"
                          }
                          alt={product.name}
                          className="h-14 w-14 rounded-lg border border-[#ece7df] object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/placeholder.webp";
                          }}
                        />

                        {/* Info */}

                        <div className="min-w-0">

                          <h4 className="truncate text-[14px] font-medium text-[#222] transition-colors group-hover:text-[#9d7748]">
                            {product.name}
                          </h4>

                          {product.collection?.name && (
                            <p className="text-[12px] text-[#888]">
                              {product.collection.name}
                            </p>
                          )}

                          {product.category?.name && (
                            <p className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-[#aaa]">
                              {product.category.name}
                            </p>
                          )}

                        </div>

                      </Link>

                    ))}

                </div>
              )}

          </div>

        </div>
      </div>
    </div>
  );
}