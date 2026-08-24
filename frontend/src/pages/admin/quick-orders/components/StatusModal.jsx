import {
  X,
  Clock3,
  BadgeCheck,
  LoaderCircle,
  PackageCheck,
  Ban,
} from "lucide-react";
import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock3,
    color: "border-yellow-300 bg-yellow-50 text-yellow-700",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    icon: BadgeCheck,
    color: "border-blue-300 bg-blue-50 text-blue-700",
  },
  {
    value: "processing",
    label: "Processing",
    icon: LoaderCircle,
    color: "border-indigo-300 bg-indigo-50 text-indigo-700",
  },
  {
    value: "completed",
    label: "Completed",
    icon: PackageCheck,
    color: "border-green-300 bg-green-50 text-green-700",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: Ban,
    color: "border-red-300 bg-red-50 text-red-700",
  },
];

export default function StatusModal({
  open,
  onClose,
  order,
  onSave,
}) {
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order?.status) {
      setStatus(order.status.toLowerCase());
    }
  }, [order]);

  if (!open) return null;

  const handleSave = async () => {
    try {
      setLoading(true);

      await onSave(status);

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-[#173724]">
              Update Order Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select the current status for this quick order.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-4 p-6">

          {STATUS_OPTIONS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.value}
                onClick={() => setStatus(item.value)}
                className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                  status === item.value
                    ? `${item.color} ring-2 ring-[#173724]`
                    : "border-gray-200 hover:border-[#173724]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={22} />

                  <div>
                    <h4 className="font-semibold">
                      {item.label}
                    </h4>

                    <p className="text-xs opacity-70">
                      Set order as {item.label.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div
                  className={`h-5 w-5 rounded-full border-2 ${
                    status === item.value
                      ? "border-[#173724] bg-[#173724]"
                      : "border-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t p-6 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-xl bg-[#173724] px-8 py-3 font-medium text-white transition hover:bg-[#0f281b] disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>

        </div>

      </div>
    </div>
  );
}