import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebsiteJournals } from "../../../redux/journal";

export default function JournalSection() {
  const dispatch = useDispatch();

  const {
    websiteJournals = [],
    loading,
  } = useSelector((state) => state.journal);

  useEffect(() => {
    dispatch(fetchWebsiteJournals());
  }, [dispatch]);

  // Home page par latest 3 articles
  const latestJournals = websiteJournals.slice(0, 3);

  return (
    <section className="bg-[#FAF8F5] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= HEADING ================= */}

        <div className="mb-12 text-center">

          <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#B8862B]">
            Journal
          </p>

          <h2
            className="mt-3 text-[32px] leading-tight text-[#1D1D1D] md:text-[38px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Stories & Inspiration
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[13px] leading-6 text-[#6B6259]">
            Discover design ideas, textile inspiration and the craftsmanship
            behind every His Masterpiece collection.
          </p>

        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="h-[250px] w-full bg-[#EDE8DF]" />

                <div className="pt-5">
                  <div className="h-2.5 w-20 bg-[#E5DED3]" />

                  <div className="mt-3 h-6 w-4/5 bg-[#E5DED3]" />

                  <div className="mt-3 h-4 w-3/5 bg-[#E5DED3]" />
                </div>
              </div>
            ))}

          </div>
        ) : latestJournals.length > 0 ? (

          /* ================= CARDS ================= */

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

            {latestJournals.map((item) => (

              <Link
                key={item._id}
                to={`/journal/${item.slug}`}
                className="group block"
              >

                {/* Image */}

                <div className="overflow-hidden bg-[#F7F5F0]">

                  <img
                    src={
                      item.featuredImage ||
                      "/images/journal/journal-placeholder.webp"
                    }
                    alt={item.title}
                    loading="lazy"
                    className="h-[250px] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />

                </div>

                {/* Content */}

                <div className="pt-5">

                  {/* Date */}

                  {item.publishedAt && (
                    <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#B8862B]">
                      {new Date(item.publishedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  )}

                  {/* Title */}

                  <h3
                    className="mt-2.5 text-[23px] leading-[1.15] text-[#1D1D1D] transition duration-300 group-hover:text-[#B8862B] md:text-[24px]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}

                  {item.shortDescription && (
                    <p className="mt-2.5 line-clamp-2 text-[13px] leading-5 text-[#6B6259]">
                      {item.shortDescription}
                    </p>
                  )}

                  {/* Read Article */}

                  <span className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#1D1D1D]">

                    Read Article

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>

                  </span>

                </div>

              </Link>

            ))}

          </div>

        ) : (

          /* ================= EMPTY ================= */

          <div className="py-14 text-center">

            <h3
              className="text-[28px] text-[#183425]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              No Journal Articles Yet
            </h3>

            <p className="mt-2 text-[12px] text-[#6B6259]">
              Our latest stories and inspirations will appear here soon.
            </p>

          </div>

        )}

        {/* ================= VIEW ALL ================= */}

        {latestJournals.length > 0 && (
          <div className="mt-12 flex justify-center">

            <Link
              to="/journal"
              className="border border-[#1D1D1D] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition duration-300 hover:bg-[#1D1D1D] hover:text-white"
            >
              View All Articles
            </Link>

          </div>
        )}

      </div>
    </section>
  );
}