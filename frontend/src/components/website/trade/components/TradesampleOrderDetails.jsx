import {
  X,
  CalendarDays,
  Package,
  User,
  MapPin,
  CreditCard,
  FileText,
} from "lucide-react";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
  Packed: "bg-purple-100 text-purple-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function TradeSampleOrderDetails({
  order,
  onClose,
}) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* =========================
            Header
        ========================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="font-cormorant text-4xl text-[#183425]">
              Sample Order Details
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Review your submitted sample request.
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

          {/* =========================
              Hero
          ========================= */}

          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">

            <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F6F2]">

              {order?.product?.featuredImage ? (
                <img
                  src={order.product.featuredImage}
                  alt={order.product.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

            </div>

            <div>

              <div className="flex flex-wrap gap-2">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    statusColor[order.status]
                  }`}
                >
                  {order.status}
                </span>

                <span className="rounded-full bg-[#183425] px-3 py-1 text-sm text-white">
                  {order.orderNumber}
                </span>

                <span className="rounded-full bg-[#F3E7C7] px-3 py-1 text-sm text-[#183425]">
                  {order.paymentStatus}
                </span>

              </div>

              <h3 className="mt-6 text-3xl font-bold text-[#183425]">
                {order.product?.name}
              </h3>

              <p className="mt-2 text-gray-600">
                {order.companyName || "Individual Customer"}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl border p-5">

                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Quantity
                  </p>

                  <h4 className="mt-2 text-xl font-semibold">
                    {order.quantity}
                  </h4>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Sample Price
                  </p>

                  <h4 className="mt-2 text-xl font-semibold">
                    ${order.samplePrice || 0}
                  </h4>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Grand Total
                  </p>

                  <h4 className="mt-2 text-xl font-semibold">
                    ${order.grandTotal || 0}
                  </h4>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Requested
                  </p>

                  <div className="mt-2 flex items-center gap-2">

                    <CalendarDays size={18} />

                    {new Date(
                      order.createdAt,
                    ).toLocaleDateString()}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              Customer Information
          ========================= */}

          <div className="rounded-2xl border">

            <div className="flex items-center gap-3 border-b px-6 py-4">

              <User
                size={22}
                className="text-[#183425]"
              />

              <h3 className="font-cormorant text-3xl text-[#183425]">
                Customer Information
              </h3>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Name
                </label>

                <p className="mt-2 font-medium">
                  {order.customerName}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Email
                </label>

                <p className="mt-2">
                  {order.email}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Phone
                </label>

                <p className="mt-2">
                  {order.phone}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Business
                </label>

                <p className="mt-2">
                  {order.companyName || "-"}
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              Product Information
          ========================= */}

          <div className="rounded-2xl border">

            <div className="flex items-center gap-3 border-b px-6 py-4">

              <Package
                size={22}
                className="text-[#183425]"
              />

              <h3 className="font-cormorant text-3xl text-[#183425]">
                Product Information
              </h3>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Product
                </label>

                <p className="mt-2">
                  {order.product?.name}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  SKU
                </label>

                <p className="mt-2">
                  {order.sku || "-"}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Quantity
                </label>

                <p className="mt-2">
                  {order.quantity}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Currency
                </label>

                <p className="mt-2">
                  {order.currency}
                </p>

              </div>

            </div>

          </div>
                    {/* =========================
              Shipping Information
          ========================= */}

          <div className="rounded-2xl border">

            <div className="flex items-center gap-3 border-b px-6 py-4">

              <MapPin
                size={22}
                className="text-[#183425]"
              />

              <h3 className="font-cormorant text-3xl text-[#183425]">
                Shipping Information
              </h3>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">

              <div className="lg:col-span-3">

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Address
                </label>

                <p className="mt-2 leading-7">
                  {order.shippingAddress || "-"}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  City
                </label>

                <p className="mt-2">
                  {order.city || "-"}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  State
                </label>

                <p className="mt-2">
                  {order.state || "-"}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Postal Code
                </label>

                <p className="mt-2">
                  {order.postalCode || "-"}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Country
                </label>

                <p className="mt-2">
                  {order.country || "-"}
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              Payment Summary
          ========================= */}

          <div className="rounded-2xl border">

            <div className="flex items-center gap-3 border-b px-6 py-4">

              <CreditCard
                size={22}
                className="text-[#183425]"
              />

              <h3 className="font-cormorant text-3xl text-[#183425]">
                Payment Summary
              </h3>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-5">

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Sample Price
                </label>

                <p className="mt-2 font-semibold">
                  ${order.samplePrice || 0}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Shipping
                </label>

                <p className="mt-2 font-semibold">
                  ${order.shippingCost || 0}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Discount
                </label>

                <p className="mt-2 font-semibold">
                  ${order.discount || 0}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Tax
                </label>

                <p className="mt-2 font-semibold">
                  ${order.tax || 0}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Grand Total
                </label>

                <p className="mt-2 text-xl font-bold text-[#183425]">
                  ${order.grandTotal || 0}
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              Notes
          ========================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border">

              <div className="flex items-center gap-3 border-b px-6 py-4">

                <FileText
                  size={20}
                  className="text-[#183425]"
                />

                <h3 className="font-cormorant text-3xl text-[#183425]">
                  Customer Message
                </h3>

              </div>

              <div className="p-6">

                <p className="leading-7 text-gray-700">
                  {order.message ||
                    "No message provided."}
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
                  {order.adminNote ||
                    "No admin note available."}
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              Timeline
          ========================= */}

          <div className="rounded-2xl border">

            <div className="border-b px-6 py-4">

              <h3 className="font-cormorant text-3xl text-[#183425]">
                Timeline
              </h3>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-3">

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Created
                </label>

                <p className="mt-2">
                  {new Date(
                    order.createdAt,
                  ).toLocaleString()}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Updated
                </label>

                <p className="mt-2">
                  {new Date(
                    order.updatedAt,
                  ).toLocaleString()}
                </p>

              </div>

              <div>

                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Current Status
                </label>

                <p className="mt-2 font-semibold text-[#183425]">
                  {order.status}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            Footer
        ========================= */}

        <div className="flex justify-end border-t bg-[#FAF8F4] px-8 py-5">

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