import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import ProductPagination from "./ProductPagination";
import { useEffect, useMemo } from "react";
import ProductToolbar from "./ProductToolbar";

const ITEMS_PER_PAGE = 12;

const ProductsLayout = ({
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
  currentPage = 1,
  setCurrentPage,
  isSampleMode,
}) => {
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && setCurrentPage) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-0 lg:grid-cols-[240px_1fr] lg:gap-10">
      {/* Filters */}
      <ProductFilters
        open={filterOpen}
        setOpen={setFilterOpen}
        filters={filters}
        setFilters={setFilters}
        collections={collections}
        categories={categories}
        materials={materials}
        colors={colors}
      />

      {/* Products */}
      <div className="min-w-0">
        <ProductToolbar
          totalProducts={filteredProducts.length}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          setFilterOpen={setFilterOpen}
        />

        <ProductGrid products={paginatedProducts} isSampleMode={isSampleMode} />

        {totalPages > 1 && (
          <div className="mt-10">
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsLayout;
