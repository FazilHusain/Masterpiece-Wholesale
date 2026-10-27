import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchWebsiteProduct,
  fetchRelatedProducts,
} from "../../redux/websiteProduct/websiteProductThunk";

import { clearWebsiteProduct } from "../../redux/websiteProduct";

import ProductGallery from "../../components/website/product/ProductGallery";
import ProductInfo from "../../components/website/product/ProductInfo";
import ProductDescription from "../../components/website/product/ProductDescription";
import ProductStory from "../../components/website/product/ProductStory";
import ProductDownloads from "../../components/website/product/ProductDownloads";
import RelatedProducts from "../../components/website/product/RelatedProducts";
//import ProductCardSkeleton from "../../components/website/product/ProductCardSkeleton";
import StickyProductCTA from "../../components/website/product/StickyProductCTA";
import ProductSpecificationTable from "../../components/website/product/ProductSpecificationTable";

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const {
    product,
    relatedProducts,
    loading,
  } = useSelector((state) => state.websiteProduct);

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchWebsiteProduct(slug));
    dispatch(fetchRelatedProducts(slug));

    return () => {
      dispatch(clearWebsiteProduct());
    };
  }, [dispatch, slug]);

  /* Loading */
  if (loading) {
    return (
      <main className="bg-white">
        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:gap-14">

            {/* Gallery Skeleton */}
            <div>
              <div className="aspect-square w-full animate-pulse bg-gray-200" />

              <div className="mt-3 grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square animate-pulse bg-gray-200"
                  />
                ))}
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="py-2">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 h-10 w-4/5 animate-pulse rounded bg-gray-200" />

              <div className="mt-5 h-5 w-32 animate-pulse rounded bg-gray-200" />

              <div className="mt-8 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="mt-8 h-12 w-full animate-pulse rounded bg-gray-200" />
            </div>

          </div>
        </section>
      </main>
    );
  }

  /* Not Found */
  if (!product) {
    return (
      <section className="bg-[#FAF8F5] px-6 py-20 text-center">
        <h1 className="font-cormorant text-[38px] text-[#183425]">
          Product Not Found
        </h1>

        <p className="mt-3 text-[14px] leading-7 text-[#6B6259]">
          The requested product could not be found.
        </p>
      </section>
    );
  }

  return (
    <main className="bg-white">

      {/* Product Hero */}
      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">

          <ProductGallery product={product} />

          <ProductInfo product={product} />

        </div>
      </section>

      {/* Description */}
      <ProductDescription product={product} />

      {/* Specifications */}
      <ProductSpecificationTable product={product} />

      {/* Story */}
      {product.storySections?.length > 0 && (
        <ProductStory story={product.storySections} />
      )}

      {/* Downloads */}
      {product.downloads?.length > 0 && (
        <ProductDownloads downloads={product.downloads} />
      )}

      {/* Videos */}
      {/* {product.videos?.length > 0 && (
        <ProductVideos videos={product.videos} />
      )} */}

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}

      {/* Bottom CTA */}
      <StickyProductCTA product={product} />

    </main>
  );
};

export default ProductDetail;