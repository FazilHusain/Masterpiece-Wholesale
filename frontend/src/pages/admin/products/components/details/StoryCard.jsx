import DetailCard from "../../../../../components/common/DetailCard";
export default function StoryCard({
  product,
}) {
  const stories = product?.storySections || [];

  return (
    <DetailCard
      title="Story Sections"
      subtitle="Product story and craftsmanship."
    >
      {!stories.length ? (
        <div className="rounded-xl border border-dashed border-[#E8E2D9] py-12 text-center text-gray-400">
          No story sections available.
        </div>
      ) : (
        <div className="space-y-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#E8E2D9] p-6"
            >
              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div>
                  <div className="aspect-square overflow-hidden rounded-xl border border-[#E8E2D9] bg-[#F8F6F2]">
                    {story.image ? (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-[#12312B]">
                      {story.title || `Story ${index + 1}`}
                    </h3>

                    <span className="rounded-lg bg-[#F8F6F2] px-3 py-1 text-xs font-medium text-[#12312B]">
                      Order {story.sortOrder}
                    </span>
                  </div>

                  <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
                    {story.description || "-"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DetailCard>
  );
}