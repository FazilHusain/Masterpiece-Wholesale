import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CategoryStrip() {
  const { categories = [] } = useSelector((state) => state.websiteCategory);

  return (
    <section className="border-y border-[#ececec] bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-start gap-2 overflow-x-auto py-3 scrollbar-hide lg:justify-center">
          {/* Dynamic Categories */}

          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category.slug}`}
              className="
                whitespace-nowrap
                border
                border-[#cfd6df]
                bg-[#f8f9fb]
                min-w-[150px] 
                text-center
                py-[10px]
                text-[10px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[#22324d]
                transition-all
                duration-300
                hover:border-[#b38b59]
                hover:bg-[#b38b59]
                hover:text-white
              "
            >
              {category.name}
            </Link>
          ))}

          {/* Static */}

          <Link
            to="/products?filter=new"
            className="
              whitespace-nowrap
              border
              border-[#cfd6df]
              bg-[#f8f9fb]
             min-w-[150px] 
                text-center
              py-[10px]
              text-[11px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-[#22324d]
              transition-all
              duration-300
              hover:border-[#b38b59]
              hover:bg-[#b38b59]
              hover:text-white
            "
          >
            New Arrivals
          </Link>

          <Link
            to="/products?filter=bestseller"
            className="
              whitespace-nowrap
              border
              border-[#cfd6df]
              bg-[#f8f9fb]
              min-w-[150px] 
                text-center
              py-[10px]
              text-[11px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-[#22324d]
              transition-all
              duration-300
              hover:border-[#b38b59]
              hover:bg-[#b38b59]
              hover:text-white
            "
          >
            Best Sellers
          </Link>

          <Link
            to="/products?filter=instock"
            className="
              whitespace-nowrap
              border
              border-[#cfd6df]
              bg-[#f8f9fb]
              min-w-[150px] 
                text-center
              py-[10px]
              text-[11px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-[#22324d]
              transition-all
              duration-300
              hover:border-[#b38b59]
              hover:bg-[#b38b59]
              hover:text-white
            "
          >
            In-Stock Now
          </Link>
        </div>
      </div>
    </section>
  );
}
