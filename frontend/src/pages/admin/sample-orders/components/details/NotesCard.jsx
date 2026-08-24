import DetailCard from "../../../../../components/common/DetailCard";

export default function NotesCard({ order }) {
  return (
    <DetailCard
      title="Notes"
      subtitle="Customer and admin notes."
    >
      <div className="space-y-6">

        {/* Customer Note */}

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#12312B]">
            Customer Message
          </h3>

          <div className="min-h-[110px] whitespace-pre-wrap rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4 text-gray-600">
            {order?.message || "No customer message."}
          </div>
        </div>

        {/* Admin Note */}

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#12312B]">
            Admin Note
          </h3>

          <div className="min-h-[110px] whitespace-pre-wrap rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4 text-gray-600">
            {order?.adminNote || "No admin note added."}
          </div>
        </div>

      </div>
    </DetailCard>
  );
}