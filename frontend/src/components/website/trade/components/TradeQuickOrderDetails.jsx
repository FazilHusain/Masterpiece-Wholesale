import { X, CalendarDays, Package, FileText } from "lucide-react";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-indigo-100 text-indigo-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function TradeQuickOrderDetails({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">
          <div>
            <h2 className="font-cormorant text-4xl text-[#183425]">
              Quick Order Details
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Review your submitted quick order.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        <div className="space-y-8 p-8">
          {/* Order Summary */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border p-5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Order Number
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[#183425]">
                {order.orderNumber}
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Status
              </p>

              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  statusColor[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Submitted
              </p>

              <div className="mt-3 flex items-center gap-2">
                <CalendarDays size={18} />

                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Company
              </p>

              <h3 className="mt-2 font-semibold text-[#183425]">
                {order.companyName || "-"}
              </h3>
            </div>
          </div>

          {/* Customer */}

          <div className="rounded-2xl border">
            <div className="border-b px-6 py-4">
              <h3 className="font-cormorant text-3xl text-[#183425]">
                Customer Information
              </h3>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Name
                </label>

                <p className="mt-2 font-medium">{order.customerName}</p>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Email
                </label>

                <p className="mt-2 font-medium">{order.email}</p>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Phone
                </label>

                <p className="mt-2 font-medium">{order.phone}</p>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Country
                </label>

                <p className="mt-2 font-medium">{order.country || "-"}</p>
              </div>
            </div>
          </div>
          {/* Order Items */}

          <div className="rounded-2xl border">
            <div className="flex items-center gap-3 border-b px-6 py-4">
              <Package className="text-[#183425]" size={22} />

              <h3 className="font-cormorant text-3xl text-[#183425]">
                Order Items
              </h3>
            </div>

            <div className="p-6">
              <div className="rounded-lg bg-[#F8F6F2] p-5">
                <pre className="whitespace-pre-wrap break-words font-sans text-[14px] leading-7 text-[#183425]">
                  {order.orderItems}
                </pre>
              </div>
            </div>
          </div>

          {/* Notes */}

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border">
              <div className="flex items-center gap-3 border-b px-6 py-4">
                <FileText className="text-[#183425]" size={20} />

                <h3 className="font-cormorant text-3xl text-[#183425]">
                  Additional Notes
                </h3>
              </div>

              <div className="p-6">
                <p className="leading-7 text-gray-700">
                  {order.notes ? order.notes : "No additional notes provided."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border">
              <div className="border-b px-6 py-4">
                <h3 className="font-cormorant text-3xl text-[#183425]">
                  Admin Note
                </h3>
              </div>

              <div className="p-6">
                <p className="leading-7 text-gray-700">
                  {order.adminNote
                    ? order.adminNote
                    : "No admin note available."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t bg-[#FAF8F4] px-8 py-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#183425] px-6 py-3 font-medium text-[#183425] transition hover:bg-[#183425] hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
