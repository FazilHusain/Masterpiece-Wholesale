import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function SidebarStories({
  stories = [],
  title = "Latest Stories",
}) {
  if (!stories.length) return null;

  return (
    <aside>
      {/* ================= HEADING ================= */}

      <div className="mb-6">

        <p className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#B68C2F]">
          Journal
        </p>

        <h3
          className="mt-2 text-[28px] font-medium leading-tight text-[#183425]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          {title}
        </h3>

      </div>

      {/* ================= STORIES ================= */}

      <div className="space-y-5">

        {stories.map((story, index) => (

          <article
            key={story._id}
            className={
              index !== stories.length - 1
                ? "border-b border-[#E8E2D8] pb-5"
                : ""
            }
          >

            <Link
              to={`/journal/${story.slug}`}
              className="group flex gap-4"
            >

              {/* Thumbnail */}

              <div className="h-[76px] w-[76px] shrink-0 overflow-hidden bg-[#F3F0EA]">

                <img
                  src={story.featuredImage}
                  alt={story.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                />

              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                {/* Meta */}

                <div className="flex flex-wrap items-center gap-1.5 text-[8px] uppercase tracking-[0.16em] text-[#8A8A8A]">

                  {story.category && (
                    <>
                      <span className="font-semibold text-[#B68C2F]">
                        {story.category}
                      </span>

                      <span>•</span>
                    </>
                  )}

                  {story.publishedAt && (
                    <span>
                      {new Date(
                        story.publishedAt
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}

                </div>

                {/* Title */}

                <h4
                  className="mt-2 line-clamp-2 text-[19px] font-medium leading-[1.15] text-[#183425] transition-colors duration-300 group-hover:text-[#B68C2F]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {story.title}
                </h4>

                {/* CTA */}

                <span className="mt-2.5 inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#183425] transition-colors duration-300 group-hover:text-[#B68C2F]">

                  Read Journal

                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </span>

              </div>

            </Link>

          </article>

        ))}

      </div>
    </aside>
  );
}