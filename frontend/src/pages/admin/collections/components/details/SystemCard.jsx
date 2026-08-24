import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SystemCard({
  collection,
}) {
  return (
    <DetailCard
      title="System Information"
      subtitle="Record information."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <DetailItem
          label="Collection ID"
          value={collection?._id}
        />

        <DetailItem
          label="Created At"
          value={
            collection?.createdAt
              ? new Date(
                  collection.createdAt
                ).toLocaleString()
              : "-"
          }
        />

        <DetailItem
          label="Updated At"
          value={
            collection?.updatedAt
              ? new Date(
                  collection.updatedAt
                ).toLocaleString()
              : "-"
          }
        />
      </div>
    </DetailCard>
  );
}