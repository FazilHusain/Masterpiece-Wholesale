import DetailCard from "../../../../../components/common/DetailCard";
import { Badge } from "../../../../../components/ui";

export default function VariantCard({
  product,
}) {
  const variants = product?.variants || [];

  return (
    <DetailCard
      title="Wholesale Variants"
      subtitle="Available product variants."
    >
      {!variants.length ? (
        <div className="rounded-xl border border-dashed border-[#E8E2D9] py-12 text-center text-gray-400">
          No variants available.
        </div>
      ) : (
        <div className="space-y-5">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#E8E2D9] p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#12312B]">
                  Variant {index + 1}
                </h3>

                <Badge
                  variant={
                    variant.isActive
                      ? "success"
                      : "danger"
                  }
                >
                  {variant.isActive
                    ? "Active"
                    : "Inactive"}
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Size
                  </p>

                  <p className="mt-2 font-medium text-[#12312B]">
                    {variant.size || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Dimensions
                  </p>

                  <p className="mt-2 font-medium text-[#12312B]">
                    {variant.dimensions || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Color
                  </p>

                  <p className="mt-2 font-medium text-[#12312B]">
                    {variant.color || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    SKU
                  </p>

                  <p className="mt-2 font-medium text-[#12312B]">
                    {variant.sku || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Price
                  </p>

                  <p className="mt-2 font-medium text-[#12312B]">
                    ₹ {variant.price ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    MOQ
                  </p>

                  <p className="mt-2 font-medium text-[#12312B]">
                    {variant.moq ?? 1}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Stock
                  </p>

                  <p className="mt-2 font-medium text-[#12312B]">
                    {variant.stock ?? 0}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </DetailCard>
  );
}