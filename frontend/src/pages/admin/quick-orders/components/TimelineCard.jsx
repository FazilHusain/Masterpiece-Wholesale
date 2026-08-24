import { CalendarDays } from "lucide-react";

const TimelineCard = ({ order }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-5">
        Timeline
      </h2>

      <div className="space-y-5">

        <div className="flex gap-3">

          <CalendarDays size={18} className="mt-1 text-[#183425]" />

          <div>

            <p className="font-medium">
              Order Created
            </p>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <CalendarDays size={18} className="mt-1 text-[#183425]" />

          <div>

            <p className="font-medium">
              Last Updated
            </p>

            <p className="text-sm text-gray-500">
              {new Date(order.updatedAt).toLocaleString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TimelineCard;