import {
  Boxes,
  Hash,
  ImageIcon,
  Layers3,
  Package2,
} from "lucide-react";

import DetailCard from "../../../../../components/common/DetailCard";
import InfoBox from "../../../../../components/common/InfoBox";

export default function ProductCard({ order }) {
  return (
    <DetailCard
      title="Product Information"
      subtitle="Requested product details."
    >
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

        {/* Product Image */}

        <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F6F2] shadow-sm">

          {order?.product?.featuredImage ? (
            <img
              src={order.product.featuredImage}
              alt={order.product.name}
              className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex aspect-square flex-col items-center justify-center gap-3 text-gray-400">
              <ImageIcon size={34} />
              <span>No Product Image</span>
            </div>
          )}

        </div>

        {/* Product Details */}

        <div className="grid gap-5 md:grid-cols-2">

          <InfoBox
            icon={<Package2 size={18} />}
            label="Product"
            value={order?.product?.name || "Product Removed"}
          />

          <InfoBox
            icon={<Hash size={18} />}
            label="SKU"
            value={
              order?.sku ||
              order?.product?.sku ||
              "-"
            }
          />

          <InfoBox
            icon={<Layers3 size={18} />}
            label="Variant"
            value={order?.variant || "-"}
          />

          <InfoBox
            icon={<Boxes size={18} />}
            label="Quantity"
            value={`${order?.quantity || 0} ${order?.unit || ""}`}
          />

        </div>

      </div>
    </DetailCard>
  );
}