import { Card } from "../../../../components/ui";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const getProductName = (product) => {
  if (!product) return "Product unavailable";

  if (typeof product === "object") {
    return product.name || product.title || "Product";
  }

  return "Product details unavailable";
};

const getVariantName = (variant) => {
  if (!variant) return "Standard";

  if (typeof variant === "object") {
    return variant.size || variant.dimensions || variant.color || "Standard";
  }

  return "Variant details unavailable";
};

export default function ProductInformation({ formData }) {
  const items =
    Array.isArray(formData.items) && formData.items.length > 0
      ? formData.items
      : [
          {
            product: formData.product,
            variant: formData.variant,
            sku: formData.sku,
            quantity: formData.quantity,
            samplePrice: formData.samplePrice,
            total: formData.total,
          },
        ];

  const totalQuantity = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const calculatedTotal = items.reduce((sum, item) => {
    const itemTotal =
      item.total != null
        ? Number(item.total)
        : (Number(item.quantity) || 0) * (Number(item.samplePrice) || 0);

    return sum + (Number.isFinite(itemTotal) ? itemTotal : 0);
  }, 0);

  const grandTotal =
    formData.grandTotal != null ? Number(formData.grandTotal) : calculatedTotal;

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Product Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {items.length > 1
            ? `${items.length} products in this sample order`
            : "Ordered product details"}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const quantity = Number(item.quantity) || 0;
          const samplePrice = Number(item.samplePrice) || 0;

          const itemTotal =
            item.total != null ? Number(item.total) : quantity * samplePrice;

          return (
            <div
              key={
                item._id ||
                item.product?._id ||
                `${getProductName(item.product)}-${index}`
              }
              className="rounded-xl border border-[#E8E2D9] p-4"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Product {index + 1}
                  </p>

                  <h3 className="mt-1 font-semibold text-[#12312B]">
                    {getProductName(item.product)}
                  </h3>
                </div>

                <span className="shrink-0 rounded-full bg-[#F5F2EB] px-3 py-1 text-sm text-[#12312B]">
                  Qty: {quantity}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">Variant</p>
                  <p className="mt-1 break-words font-medium">
                    {getVariantName(item.variant)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">SKU</p>
                  <p className="mt-1 break-words font-medium">
                    {item.sku || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Sample Price</p>
                  <p className="mt-1 font-medium">
                    {formatCurrency(samplePrice)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#E8E2D9] pt-3">
                <span className="text-sm text-gray-500">Item Total</span>

                <span className="font-semibold text-[#12312B]">
                  {formatCurrency(itemTotal)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 rounded-xl bg-[#F8F6F1] p-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="mt-1 text-lg font-semibold text-[#12312B]">
            {items.length}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Quantity</p>
          <p className="mt-1 text-lg font-semibold text-[#12312B]">
            {totalQuantity}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-sm text-gray-500">Grand Total</p>
          <p className="mt-1 text-2xl font-bold text-[#12312B]">
            {formatCurrency(grandTotal)}
          </p>
        </div>
      </div>
    </Card>
  );
}
