import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SeoCard({
  journal,
}) {
  return (
    <DetailCard
      title="SEO Information"
      subtitle="Search engine optimization."
    >

      <div className="grid gap-6 md:grid-cols-2">

        <DetailItem
          label="Meta Title"
          value={journal?.metaTitle}
        />

        <DetailItem
          label="Meta Description"
          value={journal?.metaDescription}
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Meta Keywords"
          value={
            journal?.metaKeywords?.join(", ") ||
            "-"
          }
        />

      </div>

    </DetailCard>
  );
}