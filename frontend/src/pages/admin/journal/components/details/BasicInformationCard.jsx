import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function BasicInformationCard({
  journal,
}) {
  return (
    <DetailCard
      title="Basic Information"
      subtitle="Primary journal details."
    >

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Title"
          value={journal?.title}
        />

        <DetailItem
          label="Slug"
          value={journal?.slug}
        />

        <DetailItem
          label="Author"
          value={journal?.author}
        />

        <DetailItem
          label="Category"
          value={journal?.category}
        />

        <DetailItem
          label="Published"
          value={
            journal?.publishedAt
              ? new Date(
                  journal.publishedAt
                ).toLocaleDateString()
              : "-"
          }
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Short Description"
          value={journal?.shortDescription}
        />

      </div>

    </DetailCard>
  );
}