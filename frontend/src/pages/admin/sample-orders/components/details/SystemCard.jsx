import {
  CalendarDays,
  FileText,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import DetailCard from "../../../../../components/common/DetailCard";
import InfoBox from "../../../../../components/common/InfoBox";

export default function SystemCard({ order }) {
  return (
    <DetailCard
      title="System Information"
      subtitle="Internal record information."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        <InfoBox
          icon={<FileText size={18} />}
          label="Order Number"
          value={order?.orderNumber}
        />

        <InfoBox
          icon={<ShieldCheck size={18} />}
          label="Current Status"
          value={order?.status}
        />

        <InfoBox
          icon={<UserCheck size={18} />}
          label="Reviewed By"
          value={
            order?.reviewedBy
              ? `${order.reviewedBy.firstName} ${order.reviewedBy.lastName}`
              : "Not Reviewed"
          }
        />

        <InfoBox
          icon={<CalendarDays size={18} />}
          label="Created At"
          value={
            order?.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "-"
          }
        />

        <InfoBox
          icon={<CalendarDays size={18} />}
          label="Updated At"
          value={
            order?.updatedAt
              ? new Date(order.updatedAt).toLocaleString()
              : "-"
          }
        />

      </div>
    </DetailCard>
  );
}