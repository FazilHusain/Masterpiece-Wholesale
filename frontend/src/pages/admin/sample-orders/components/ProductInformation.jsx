import { Card, Input } from "../../../../components/ui";

export default function ProductInformation({
  formData,
  handleChange,
}) {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-[#12312B]">
          Product Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Ordered product details.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Product"
          name="product"
          value={
            formData.product?.name ||
            formData.product
          }
          disabled
        />

        <Input
          label="Variant"
          name="variant"
          value={formData.variant}
          onChange={handleChange}
        />

        <Input
          label="SKU"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
        />

        <Input
          type="number"
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

      </div>

    </Card>
  );
}