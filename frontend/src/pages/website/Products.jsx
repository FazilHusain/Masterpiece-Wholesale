import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchWebsiteProducts } from "../../redux/websiteProduct";

import ProductHero from "../../components/website/product/ProductHero";
import ProductsLayout from "../../components/website/product/ProductsLayout";
import ProductCardSkeleton from "../../components/website/product/ProductCardSkeleton";

import useProductListing from "../../hooks/useProductListing";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { products, loading } = useSelector((state) => state.websiteProduct);

  console.log(products);

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
    currentPage,
    setCurrentPage,
  } = useProductListing(products || []);

  const isSampleMode =
    new URLSearchParams(location.search).get("type") === "sample";

  useEffect(() => {
    console.log("FETCH WEBSITE PRODUCTS RUNNING");

    dispatch(fetchWebsiteProducts())
      .unwrap()
      .then((response) => {
        console.log("PRODUCT API RESPONSE =>", response);
      })
      .catch((error) => {
        console.error("PRODUCT API ERROR =>", error);
      });
  }, [dispatch]);

  return (
    <>
      {/* Hero */}
      <ProductHero isSampleMode={isSampleMode} />

      {/* Products */}
      <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-18">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isSampleMode={isSampleMode}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
