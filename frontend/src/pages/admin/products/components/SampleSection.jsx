import { Card, Input, Switch } from "../../../../components/ui";

export default function SampleSection({
  formData,
  setFormData,
}) {
  const sample = formData.sample || {};

  const updateSample = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      sample: {
        ...prev.sample,
        [field]: value,
      },
    }));
  };

  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#12312B]">
          Sample Product
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Configure sample order details for this product.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="flex items-end">
          <Switch
            label="Sample Available"
            checked={sample.available}
            onChange={(value) =>
              updateSample("available", value)
            }
          />
        </div>

        <Input
          label="Sample SKU"
          value={sample.sku}
          onChange={(e) =>
            updateSample("sku", e.target.value)
          }
          placeholder="SAMPLE-001"
        />

        <Input
          type="number"
          label="Sample Price"
          value={sample.price}
          onChange={(e) =>
            updateSample("price", e.target.value)
          }
          placeholder="199"
        />

        <Input
          type="number"
          label="Sample Stock"
          value={sample.stock}
          onChange={(e) =>
            updateSample("stock", e.target.value)
          }
          placeholder="20"
        />

      </div>

      <div className="mt-6 rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-5">
        <h4 className="font-semibold text-[#12312B]">
          Sample Order
        </h4>

        <p className="mt-2 text-sm text-gray-500 leading-6">
          If enabled, customers can purchase a single sample of this
          product. Payment will be processed using <strong>PayGlocal</strong>
          once the integration is completed.
        </p>
      </div>
    </Card>
  );
}