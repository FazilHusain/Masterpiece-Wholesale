import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchCollectionProducts,
} from "../../../redux/websiteCollection";

import ProductsLayout from "../product/ProductsLayout";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import EmptyCollection from "../../../components/website/collections/EmptyCollection";
import useProductListing from "../../../hooks/useProductListing";

const CollectionProducts = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const {
    collectionProducts,
    collection,
    collectionProductsLoading,
  } = useSelector((state) => state.websiteCollection);

  const products = Array.isArray(collectionProducts)
    ? collectionProducts
    : [];

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
  } = useProductListing(products);

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchCollectionProducts(slug));
  }, [dispatch, slug]);

  return (
    <>
      <Helmet>
        <title>
          {collection?.name
            ? `${collection.name} Products | His Masterpiece`
            : "Collection Products | His Masterpiece"}
        </title>

        <meta
          name="description"
          content={
            collection?.metaDescription ||
            collection?.shortDescription ||
            "Browse handcrafted luxury products."
          }
        />
      </Helmet>

      <section className="bg-[#FAF8F5] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-10">
            <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#B68C2F]">
              Collection
            </p>

            <h2
              className="mt-3 text-[34px] leading-tight text-[#183425] sm:text-[40px] lg:text-[46px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              {collection?.name || "Collection"} Products
            </h2>

            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-[#6B6259]">
              {collection?.shortDescription ||
                "Explore our handcrafted luxury collection designed for premium interiors, hospitality projects, and bespoke spaces."}
            </p>
          </div>

          {/* Loading */}
          {collectionProductsLoading ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
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
              description="Products will appear here once they are added to this collection."
            />
          )}

        </div>
      </section>
    </>
  );
};

export default CollectionProducts;