import { Plus, Trash2 } from "lucide-react";

import {
  Card,
  Input,
  Switch,
  Button,
} from "../../../../components/ui";

export default function VariantSection({
  formData,
  setFormData,
}) {
  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          size: "",
          dimensions: "",
          color: "",
          sku: "",
          price: "",
          stock: "",
          moq: 1,
          isActive: true,
        },
      ],
    }));
  };

  const updateVariant = (index, field, value) => {
    setFormData((prev) => {
      const variants = [...prev.variants];

      variants[index] = {
        ...variants[index],
        [field]: value,
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  const removeVariant = (index) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <Card>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#12312B]">
            Wholesale Variants
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage sizes, MOQ, pricing and stock.
          </p>
        </div>

        <Button onClick={addVariant}>
          <Plus size={18} />
          Add Variant
        </Button>
      </div>

      {!formData.variants.length && (
        <div className="rounded-2xl border border-dashed border-[#E8E2D9] py-16 text-center text-gray-500">
          No variants added yet.
        </div>
      )}

      <div className="space-y-6">
        {formData.variants.map((variant, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#E8E2D9] p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#12312B]">
                Variant {index + 1}
              </h3>

              <Button
                variant="danger"
                onClick={() =>
                  removeVariant(index)
                }
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <Input
                label="Size"
                value={variant.size}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "size",
                    e.target.value
                  )
                }
              />

              <Input
                label="Dimensions"
                value={variant.dimensions}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "dimensions",
                    e.target.value
                  )
                }
              />

              <Input
                label="Color"
                value={variant.color}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "color",
                    e.target.value
                  )
                }
              />

              <Input
                label="SKU"
                value={variant.sku}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "sku",
                    e.target.value
                  )
                }
              />

              <Input
                type="number"
                label="Price"
                value={variant.price}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "price",
                    e.target.value
                  )
                }
              />

              <Input
                type="number"
                label="MOQ"
                value={variant.moq}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "moq",
                    e.target.value
                  )
                }
              />

              <Input
                type="number"
                label="Stock"
                value={variant.stock}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "stock",
                    e.target.value
                  )
                }
              />

              <div className="flex items-end">
                <Switch
                  label="Active"
                  checked={variant.isActive}
                  onChange={(value) =>
                    updateVariant(
                      index,
                      "isActive",
                      value
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}