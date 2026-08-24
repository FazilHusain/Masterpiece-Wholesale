import StoryCard from "./StoryCard";

export default function RelatedStories({ journals = [], currentSlug }) {
  const stories = journals
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 3);

  if (!stories.length) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}

        <div className="mb-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B68C2F]">
            Continue Reading
          </span>

          <h2 className="mt-4 font-cormorant text-4xl font-semibold text-[#183425] lg:text-5xl">
            Related Stories
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-[#B68C2F]" />
        </div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}