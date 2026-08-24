import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function StoryCard({ story }) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-[#ECE7DE] bg-white transition-all duration-500 hover:-translate-y-1">

      {/* Image */}

      <Link
        to={`/journal/${story.slug}`}
        className="block overflow-hidden"
      >
        <img
          src={story.featuredImage}
          alt={story.title}
          className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Content */}

      <div className="p-8">

        <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#8A8A8A]">

          <span className="font-semibold text-[#B68C2F]">
            {story.category}
          </span>

          <span>•</span>

          <span>
            {new Date(story.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

        </div>

        <h3 className="mt-5 font-cormorant text-[34px] font-semibold leading-[1.12] text-[#183425] transition-colors duration-300 group-hover:text-[#B68C2F]">
          <Link to={`/journal/${story.slug}`}>
            {story.title}
          </Link>
        </h3>

        <p className="mt-5 line-clamp-3 text-[14px] leading-8 text-[#666666]">
          {story.shortDescription}
        </p>

        <Link
          to={`/journal/${story.slug}`}
          className="group mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#183425] transition hover:text-[#B68C2F]"
        >
          Read Journal

          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-2"
          />
        </Link>

      </div>

    </article>
  );
}