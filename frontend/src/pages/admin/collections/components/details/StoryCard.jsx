import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function StoryCard({
  collection,
}) {
  return (
    <DetailCard
      title="Story"
      subtitle="Collection story information."
    >
      <div className="grid gap-6">
        <DetailItem
          label="Story Title"
          value={collection?.storyTitle}
        />

        <DetailItem
          label="Story Description"
          value={collection?.storyDescription}
        />
      </div>
    </DetailCard>
  );
}