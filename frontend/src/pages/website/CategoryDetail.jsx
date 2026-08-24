import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  clearWebsiteCategory,
} from "../../redux/websiteCategory/websiteCategorySlice";

import {
  fetchWebsiteCategory,
  fetchCategoryProducts,
} from "../../redux/websiteCategory";

import CategoryDetailHero from "../../components/website/category/CategoryDetailHero";
import CategoryStory from "../../components/website/category/CategoryStory";
import CategoryProducts from "./CategoryProducts";
import CategoryCTA from "../../components/website/category/CategoryCTA";
import CategorySkeleton from "../../components/website/category/CategorySkeleton";

const CategoryDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const {
    category,
    categoryProducts,
    loading,
    error,
  } = useSelector((state) => state.websiteCategory);

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchWebsiteCategory(slug));
    dispatch(fetchCategoryProducts(slug));

    return () => {
      dispatch(clearWebsiteCategory());
    };
  }, [dispatch, slug]);

  /* Loading */
  if (loading && !category) {
    return <CategorySkeleton />;
  }

  /* API Error */
  if (error) {
    return (
      <section className="bg-[#FAF8F5] px-6 py-20 text-center">
        <h2 className="font-cormorant text-[36px] text-[#183425] sm:text-[40px]">
          Something Went Wrong
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-[14px] leading-7 text-[#6B6259]">
          {error}
        </p>
      </section>
    );
  }

  /* Not Found */
  if (!category) {
    return (
      <section className="bg-[#FAF8F5] px-6 py-20 text-center">
        <h2 className="font-cormorant text-[36px] text-[#183425] sm:text-[40px]">
          Category Not Found
        </h2>

        <p className="mt-3 text-[14px] leading-7 text-[#6B6259]">
          The requested category could not be found.
        </p>
      </section>
    );
  }

  return (
    <>
      <CategoryDetailHero category={category} />

      <CategoryStory category={category} />

      <CategoryProducts
        products={categoryProducts || []}
      />

      <CategoryCTA />
    </>
  );
};

export default CategoryDetail;