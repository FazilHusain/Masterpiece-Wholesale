import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SeoCard({
  category,
}) {
  return (
    <DetailCard
      title="SEO Information"
      subtitle="Search engine optimization details."
    >
      <div className="grid gap-6 md:grid-cols-2">

        <DetailItem
          label="Meta Title"
          value={category?.metaTitle}
        />

        <DetailItem
          label="Slug"
          value={category?.slug}
        />

      </div>

      <div className="mt-8">
        <DetailItem
          label="Meta Description"
          value={category?.metaDescription}
        />
      </div>
    </DetailCard>
  );
}