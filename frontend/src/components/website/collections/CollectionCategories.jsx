import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CollectionCategories = ({ categories = [] }) => {
  if (!categories.length) return null;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ================= HEADING ================= */}

        <div className="mb-8">

          <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#B68C2F]">
            Explore
          </p>

          <h2
            className="mt-2 text-[30px] leading-tight text-[#183425] sm:text-[34px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Categories
          </h2>

        </div>

        {/* ================= CATEGORY GRID ================= */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {categories.map((category) => (

            <Link
              key={category._id}
              to={`/categories/${category.slug}`}
              className="group overflow-hidden border border-[#E8E2D9] bg-[#FAF8F5] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Image */}

              <div className="aspect-[4/3] overflow-hidden bg-[#F1EEE8]">

                <img
                  src={category.bannerImage}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

              </div>

              {/* Content */}

              <div className="p-5">

                <h3
                  className="text-[22px] leading-tight text-[#183425]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {category.name}
                </h3>

                {category.description && (
                  <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#6B6259]">
                    {category.description}
                  </p>
                )}

                <span className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B68C2F]">

                  Explore

                  <ChevronRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
};

export default CollectionCategories;