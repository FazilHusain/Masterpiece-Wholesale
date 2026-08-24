import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryHero from "../../components/website/category/CategoryHero";
import CategoryGrid from "../../components/website/category/CategoryGrid";
import CategorySkeleton from "../../components/website/category/CategorySkeleton";

import { fetchWebsiteCategories } from "../../redux/websiteCategory";

const Categories = () => {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector(
    (state) => state.websiteCategory
  );

  useEffect(() => {
    dispatch(fetchWebsiteCategories());
  }, [dispatch]);

  return (
    <>
      <CategoryHero />

      <section className="bg-[#FAF8F5] py-14 sm:py-16 lg:py-18">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          {loading ? (
            <CategorySkeleton />
          ) : categories?.length > 0 ? (
            <CategoryGrid categories={categories} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="font-cormorant text-[36px] text-[#183425] sm:text-[40px]">
                No Categories Found
              </h2>

              <p className="mt-3 text-[14px] leading-7 text-[#6B6259]">
                Categories will appear here once available.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Categories;