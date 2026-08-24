import { useSelector } from "react-redux";

import ProductsLayout from "../../components/website/product/ProductsLayout";
import ProductCardSkeleton from "../../components/website/product/ProductCardSkeleton";
import useProductListing from "../../hooks/useProductListing";
import EmptyCollection from "../../components/website/collections/EmptyCollection";

const CategoryProducts = () => {
  const {
    categoryProducts,
    loading,
  } = useSelector((state) => state.websiteCategory);

  const {
    filteredProducts,
    search,
    setSearch,
    sort,
    setSort,
    filterOpen,
    setFilterOpen,
    filters,
    setFilters,
    collections,
    categories,
    materials,
    colors,
  } = useProductListing(categoryProducts || []);

  /* Loading */
  if (loading) {
    return (
      <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-18">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

            <div className="mt-4 h-10 w-48 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            CATEGORY
          </p>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-tight text-[#183425] sm:text-[38px] lg:text-[42px]">
            Products
          </h2>
        </div>

        {/* Products */}
        {categoryProducts?.length ? (
          <ProductsLayout
            filteredProducts={filteredProducts}
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            filters={filters}
            setFilters={setFilters}
            collections={collections}
            categories={categories}
            materials={materials}
            colors={colors}
          />
        ) : (
          <EmptyCollection
            title="No Products Found"
            description="Products will appear here once they are added to this category."
          />
        )}

      </div>
    </section>
  );
};

export default CategoryProducts;