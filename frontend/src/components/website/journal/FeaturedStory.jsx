import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedStory({ story }) {
  if (!story) return null;

  return (
    <section className="bg-[#FAF8F5] py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= HEADING ================= */}

        <div className="mb-7">
          <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#B68C2F]">
            Featured Journal
          </p>

          <h2
            className="mt-2 text-[30px] leading-tight text-[#183425] md:text-[34px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Latest Editorial
          </h2>
        </div>

        {/* ================= FEATURED CARD ================= */}

        <div className="overflow-hidden border border-[#E8E2D9] bg-white">

          <div className="grid lg:grid-cols-[1.15fr_1fr]">

            {/* ================= IMAGE ================= */}

            <Link
              to={`/journal/${story.slug}`}
              className="group relative block overflow-hidden"
            >
              <img
                src={story.featuredImage}
                alt={story.title}
                loading="lazy"
                className="h-[260px] w-full object-cover transition duration-700 ease-out group-hover:scale-105 sm:h-[320px] lg:h-[390px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </Link>

            {/* ================= CONTENT ================= */}

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">

              {/* Meta */}

              <div className="flex flex-wrap items-center gap-2 text-[8px] font-medium uppercase tracking-[0.2em] text-[#7A7A7A]">

                {story.category && (
                  <>
                    <span className="text-[#B68C2F]">
                      {story.category}
                    </span>

                    <span>•</span>
                  </>
                )}

                {story.author && (
                  <>
                    <span>{story.author}</span>

                    <span>•</span>
                  </>
                )}

                {story.publishedAt && (
                  <span>
                    {new Date(
                      story.publishedAt
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}

              </div>

              {/* Title */}

              <h2
                className="mt-4 text-[30px] leading-[1.08] text-[#183425] sm:text-[34px] lg:text-[40px]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                {story.title}
              </h2>

              {/* Description */}

              {story.shortDescription && (
                <p className="mt-4 max-w-xl text-[13px] leading-6 text-[#5C5C5C]">
                  {story.shortDescription}
                </p>
              )}

              {/* CTA */}

              <Link
                to={`/journal/${story.slug}`}
                className="group mt-7 inline-flex w-fit items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#183425] transition hover:text-[#B68C2F]"
              >
                Read Journal

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}