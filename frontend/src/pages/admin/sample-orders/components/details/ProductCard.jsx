import { Boxes, Hash, ImageIcon, Layers3, Package2 } from "lucide-react";

import DetailCard from "../../../../../components/common/DetailCard";
import InfoBox from "../../../../../components/common/InfoBox";

export default function ProductCard({ order }) {
  const items =
    Array.isArray(order?.items) && order.items.length > 0
      ? order.items
      : order?.product
        ? [
            {
              product: order.product,
              variant: order.variant,
              sku: order.sku,
              quantity: order.quantity,
              samplePrice: order.samplePrice,
              total:
                Number(order.samplePrice || 0) * Number(order.quantity || 0),
            },
          ]
        : [];

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: order?.currency || "USD",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  return (
    <DetailCard
      title="Product Information"
      subtitle={`${items.length} product${items.length === 1 ? "" : "s"} requested.`}
    >
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No product information available.
        </p>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => {
            const product = item.product;
            const quantity = Number(item.quantity || 0);
            const samplePrice = Number(item.samplePrice || 0);
            const total =
              item.total != null ? Number(item.total) : samplePrice * quantity;

            const variant =
              typeof item.variant === "object" && item.variant !== null
                ? [
                    item.variant.size,
                    item.variant.dimensions,
                    item.variant.color,
                  ]
                    .filter(Boolean)
                    .join(" / ")
                : item.variant || "-";

            return (
              <div
                key={`${product?._id || product?.slug || index}-${index}`}
                className="grid gap-5 rounded-2xl border border-[#E8E2D9] bg-white p-4 sm:grid-cols-[140px_1fr]"
              >
                <div className="overflow-hidden rounded-xl border border-[#E8E2D9] bg-[#F8F6F2]">
                  {product?.featuredImage ? (
                    <img
                      src={product.featuredImage}
                      alt={product.name || "Sample product"}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-square flex-col items-center justify-center gap-2 text-gray-400">
                      <ImageIcon size={30} />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Product {index + 1}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-gray-900">
                      {product?.name || "Product Removed"}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoBox
                      icon={<Hash size={18} />}
                      label="SKU"
                      value={item.sku || product?.sku || "-"}
                    />

                    <InfoBox
                      icon={<Layers3 size={18} />}
                      label="Variant"
                      value={variant}
                    />

                    <InfoBox
                      icon={<Boxes size={18} />}
                      label="Quantity"
                      value={quantity}
                    />

                    <InfoBox
                      icon={<Package2 size={18} />}
                      label="Sample Price"
                      value={formatPrice(samplePrice)}
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E8E2D9] pt-3">
                    <span className="text-sm text-gray-600">Item Total</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between rounded-xl bg-[#F8F6F2] p-4">
            <span className="font-medium text-gray-700">Order Grand Total</span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(
                order?.grandTotal != null
                  ? order.grandTotal
                  : items.reduce(
                      (sum, item) =>
                        sum +
                        (item.total != null
                          ? Number(item.total) || 0
                          : (Number(item.quantity) || 0) *
                            (Number(item.samplePrice) || 0)),
                      0,
                    ),
              )}
            </span>
          </div>
        </div>
      )}
    </DetailCard>
  );
}
