import { Trash2, X, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function DeleteQuickOrderModal({
  open,
  onClose,
  order,
  onDelete,
}) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await onDelete(order?._id);

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
              <Trash2 className="text-red-600" size={24} />
            </div>

            <div>

              <h2 className="text-2xl font-semibold text-red-600">
                Delete Quick Order
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex gap-4">

              <AlertTriangle
                className="mt-1 text-red-500"
                size={28}
              />

              <div>

                <h4 className="font-semibold text-red-700">
                  Are you absolutely sure?
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  You are about to permanently delete this quick
                  order.

                  <br />

                  Order Number:

                  <span className="ml-1 font-semibold text-[#173724]">
                    {order?.orderNumber || "-"}
                  </span>

                  <br />

                  Customer:

                  <span className="ml-1 font-semibold text-[#173724]">
                    {order?.customerName || "-"}
                  </span>

                  <br />

                  This action cannot be recovered later.
                </p>

              </div>

            </div>

          </div>

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
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-8 py-3 font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete Order"}
          </button>

        </div>

      </div>

    </div>
  );
}