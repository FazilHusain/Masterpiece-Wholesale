import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SystemCard({
  category,
}) {
  return (
    <DetailCard
      title="System Information"
      subtitle="Record information."
    >
      <div className="grid gap-6 md:grid-cols-3">

        <DetailItem
          label="Category ID"
          value={category?._id}
        />

        <DetailItem
          label="Created At"
          value={
            category?.createdAt
              ? new Date(
                  category.createdAt
                ).toLocaleString()
              : "-"
          }
        />

        <DetailItem
          label="Updated At"
          value={
            category?.updatedAt
              ? new Date(
                  category.updatedAt
                ).toLocaleString()
              : "-"
          }
        />

      </div>
    </DetailCard>
  );
}