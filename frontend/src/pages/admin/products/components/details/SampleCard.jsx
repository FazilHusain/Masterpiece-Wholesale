import DetailCard from "../../../../../components/common/DetailCard";
import { Badge } from "../../../../../components/ui";

export default function SampleCard({
  product,
}) {
  const sample = product?.sample;

  return (
    <DetailCard
      title="Sample Product"
      subtitle="Sample ordering information."
    >
      {!sample ? (
        <div className="rounded-xl border border-dashed border-[#E8E2D9] py-12 text-center text-gray-400">
          Sample information not available.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Availability
            </p>

            <div className="mt-2">
              <Badge
                variant={
                  sample.available
                    ? "success"
                    : "danger"
                }
              >
                {sample.available
                  ? "Available"
                  : "Unavailable"}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              SKU
            </p>

            <p className="mt-2 font-medium text-[#12312B]">
              {sample.sku || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Sample Price
            </p>

            <p className="mt-2 font-medium text-[#12312B]">
              ₹ {sample.price ?? 0}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Stock
            </p>

            <p className="mt-2 font-medium text-[#12312B]">
              {sample.stock ?? 0}
            </p>
          </div>

        </div>
      )}
    </DetailCard>
  );
}