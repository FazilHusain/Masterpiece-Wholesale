import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SystemCard({
  banner,
}) {
  return (
    <DetailCard
      title="System Information"
      subtitle="Banner metadata and lifecycle."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Status"
          value={
            banner?.isActive
              ? "Active"
              : "Inactive"
          }
        />

        <DetailItem
          label="Start Date"
          value={
            banner?.startDate
              ? new Date(
                  banner.startDate
                ).toLocaleDateString()
              : "-"
          }
        />

        <DetailItem
          label="End Date"
          value={
            banner?.endDate
              ? new Date(
                  banner.endDate
                ).toLocaleDateString()
              : "-"
          }
        />

        <DetailItem
          label="Created At"
          value={
            banner?.createdAt
              ? new Date(
                  banner.createdAt
                ).toLocaleString()
              : "-"
          }
        />

        <DetailItem
          label="Updated At"
          value={
            banner?.updatedAt
              ? new Date(
                  banner.updatedAt
                ).toLocaleString()
              : "-"
          }
        />

      </div>
    </DetailCard>
  );
}