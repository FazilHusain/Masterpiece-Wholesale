import DetailCard from "../../../../../components/common/DetailCard";
import { StatusBadge, Badge } from "../../../../../components/ui";
import {
  CalendarDays,
  Mail,
  Phone,
  Package2,
  Hash,
  Boxes,
  Building2,
} from "lucide-react";
import InfoBox from "../../../../../components/common/InfoBox";

export default function HeroCard({ order, onStatus, onNote, onDelete }) {
  return (
    <DetailCard>
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Product Image */}

        <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F6F2] shadow-sm">
          {order?.product?.featuredImage ? (
            <img
              src={order.product.featuredImage}
              alt={order.product.name}
              className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center text-gray-400">
              No Product Image
            </div>
          )}
        </div>

        {/* Right */}

        <div className="flex flex-col justify-between">
          {/* Top */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={order?.status} />

              <Badge color="warning">{order?.orderNumber}</Badge>

              <Badge color="primary">
                {order?.tradeUser ? "Trade Customer" : "Public Customer"}
              </Badge>

              {order?.paymentStatus && (
                <Badge color="success">{order.paymentStatus}</Badge>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={onStatus}
                className="rounded-lg bg-[#173724] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#214739]"
              >
                Update Status
              </button>

              <button
                onClick={onNote}
                className="rounded-lg border border-[#173724] px-5 py-2.5 text-sm font-medium text-[#173724] transition hover:bg-[#F8F6F2]"
              >
                Admin Note
              </button>
              <button
                onClick={onDelete}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete Order
              </button>
            </div>
            <h1 className="mt-5 text-3xl font-bold text-[#173724]">
              Sample Order
            </h1>

            <p className="mt-2 text-lg font-semibold text-gray-800">
              {order?.customerName}
            </p>

            <p className="mt-1 text-gray-500">
              {order?.companyName || "Individual Customer"}
            </p>
          </div>

          {/* Information */}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <InfoBox
              icon={<Mail size={18} />}
              label="Email"
              value={order?.email || "-"}
            />

            <InfoBox
              icon={<Phone size={18} />}
              label="Phone"
              value={order?.phone || "-"}
            />

            <InfoBox
              icon={<Package2 size={18} />}
              label="Product"
              value={order?.product?.name || "Product Removed"}
            />

            <InfoBox
              icon={<Hash size={18} />}
              label="SKU"
              value={order?.product?.sku || "-"}
            />

            <InfoBox
              icon={<Boxes size={18} />}
              label="Quantity"
              value={`${order?.quantity || 0} ${order?.unit || ""}`}
            />

            <InfoBox
              icon={<CalendarDays size={18} />}
              label="Requested On"
              value={
                order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "-"
              }
            />

            <InfoBox
              icon={<Building2 size={18} />}
              label="Business"
              value={order?.companyName || "-"}
            />
          </div>
        </div>
      </div>
    </DetailCard>
  );
}
