import { Search, SlidersHorizontal } from "lucide-react";

const ProductToolbar = ({
  totalProducts,
  search,
  setSearch,
  sort,
  setSort,
  setFilterOpen,
}) => {
  return (
    <section className="mb-6">
      <div className="flex flex-col gap-5 border-b border-[#E8E2D8] pb-6 sm:flex-row sm:items-end sm:justify-between">

        {/* Product Count */}
        <div>
          <h2 className="font-cormorant text-[25px] leading-tight text-[#183425] sm:text-[28px]">
            {totalProducts}{" "}
            {totalProducts !== 1 ? "Products" : "Product"}
          </h2>

          <p className="mt-1 text-[13px] leading-6 text-[#6B6259]">
            Showing premium handcrafted collections
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="h-11 w-full rounded-full border border-[#D8D2C8] bg-white px-11 text-[13px] outline-none transition focus:border-[#183425] sm:w-64"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 rounded-full border border-[#D8D2C8] bg-white px-4 text-[13px] text-[#183425] outline-none transition focus:border-[#183425]"
          >
            <option value="latest">Latest</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>

          {/* Mobile Filter */}
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#183425] px-5 text-[12px] font-medium uppercase tracking-[0.08em] text-[#183425] transition hover:bg-[#183425] hover:text-white lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

        </div>
      </div>
    </section>
  );
};

export default ProductToolbar;