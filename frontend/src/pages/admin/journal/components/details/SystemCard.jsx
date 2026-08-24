import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SystemCard({
  journal,
}) {
  return (
    <DetailCard
      title="System Information"
      subtitle="System generated information."
    >

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Status"
          value={
            journal?.isActive
              ? "Active"
              : "Inactive"
          }
        />

        <DetailItem
          label="Featured"
          value={
            journal?.isFeatured
              ? "Yes"
              : "No"
          }
        />

        <DetailItem
          label="Display Order"
          value={journal?.displayOrder}
        />

        <DetailItem
          label="Created At"
          value={
            journal?.createdAt
              ? new Date(
                  journal.createdAt
                ).toLocaleString()
              : "-"
          }
        />

        <DetailItem
          label="Updated At"
          value={
            journal?.updatedAt
              ? new Date(
                  journal.updatedAt
                ).toLocaleString()
              : "-"
          }
        />

      </div>

    </DetailCard>
  );
}