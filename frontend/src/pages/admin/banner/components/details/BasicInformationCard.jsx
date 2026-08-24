import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function BasicInformationCard({
  banner,
}) {
  return (
    <DetailCard
      title="Basic Information"
      subtitle="Banner content and configuration."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Banner Title"
          value={banner?.title}
        />

        <DetailItem
          label="Subtitle"
          value={banner?.subtitle || "-"}
        />

        <DetailItem
          label="Page"
          value={banner?.page}
        />

        <DetailItem
          label="Banner Type"
          value={banner?.type}
        />

        <DetailItem
          label="Button Text"
          value={banner?.buttonText || "-"}
        />

        <DetailItem
          label="Button Link"
          value={banner?.buttonLink || "-"}
        />

        <DetailItem
          label="Display Order"
          value={banner?.displayOrder}
        />

      </div>

      <div className="mt-8">
        <DetailItem
          label="Description"
          value={banner?.description || "-"}
        />
      </div>
    </DetailCard>
  );
}