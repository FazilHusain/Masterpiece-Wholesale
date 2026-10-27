import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomeProductCard from "../product/HomeProductCard";
import { fetchNewArrivalProducts } from "../../../redux/websiteProduct/websiteProductThunk";

export default function NewArrivalProducts() {
  const dispatch = useDispatch();

  const { newArrivalProducts = [], newArrivalLoading } = useSelector(
    (state) => state.websiteProduct,
  );

  console.log(newArrivalProducts)
  useEffect(() => {
    dispatch(fetchNewArrivalProducts());
  }, [dispatch]);

  return (
    <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-[1240px]">
        {/* Loading */}
        {newArrivalLoading ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[0.75] w-full bg-[#f0ede6]" />
                <div className="mt-3 h-4 w-4/5 bg-[#e7e2da]" />
                <div className="mt-2 h-3 w-2/5 bg-[#e7e2da]" />
              </div>
            ))}
          </div>
        ) : newArrivalProducts.length > 0 ? (
          <>
            {/* Products */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
              {newArrivalProducts.slice(0, 8).map((product) => (
                <HomeProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Bottom Divider */}
            <div className="mt-8 border-t border-[#e7e2da]" />

            {/* View All */}
            <div className="mt-8 flex justify-center">
              <Link
                to="/products?type=new-arrival"
                className="
                  inline-flex
                  min-w-[235px]
                  items-center
                  justify-center
                  border
                  border-[#222]
                  px-7
                  py-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#222]
                  transition-all
                  duration-300
                  hover:bg-[#222]
                  hover:text-white
                "
              >
                View All New Arrivals →
              </Link>
            </div>
          </>
        ) : (
          <div className="py-14 text-center">
            <h3
              className="text-[28px] text-[#183425]"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              No New Arrivals Yet
            </h3>
            <p className="mt-2 text-[12px] text-[#6B6259]">
              New products will appear here as soon as they are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
