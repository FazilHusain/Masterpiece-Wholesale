import DetailCard from "../../../../../components/common/DetailCard";
import { CheckCircle2, Clock3, ClipboardList } from "lucide-react";

export default function TimelineCard({ order }) {
  return (
    <DetailCard
      title="Timeline"
      subtitle="Order lifecycle."
    >
      <div className="space-y-5">

        {/* Created */}

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={18}
            className="mt-1 text-green-600"
          />

          <div className="flex-1 border-b pb-4">

            <p className="text-sm font-semibold text-[#12312B]">
              Order Created
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {order?.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleString()
                : "-"}
            </p>

          </div>

        </div>

        {/* Reviewed */}

        <div className="flex items-start gap-3">

          <Clock3
            size={18}
            className="mt-1 text-amber-500"
          />

          <div className="flex-1 border-b pb-4">

            <p className="text-sm font-semibold text-[#12312B]">
              Reviewed
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {order?.reviewedAt
                ? new Date(
                    order.reviewedAt
                  ).toLocaleString()
                : "Pending"}
            </p>

          </div>

        </div>

        {/* Status */}

        <div className="flex items-start gap-3">

          <ClipboardList
            size={18}
            className="mt-1 text-[#173724]"
          />

          <div className="flex-1">

            <p className="text-sm font-semibold text-[#12312B]">
              Current Status
            </p>

            <p className="mt-1 font-semibold text-[#173724]">
              {order?.status || "-"}
            </p>

          </div>

        </div>

      </div>
    </DetailCard>
  );
}