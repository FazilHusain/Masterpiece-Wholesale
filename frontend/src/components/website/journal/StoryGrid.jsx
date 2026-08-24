import EmptyJournal from "./EmptyJournal";
import StoryCard from "./StoryCard";

export default function StoryGrid({ stories = [] }) {
  if (!stories.length) {
    return <EmptyJournal />;
  }

  return (
    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
      {stories.map((story) => (
        <StoryCard
          key={story._id}
          story={story}
        />
      ))}
    </div>
  );
}