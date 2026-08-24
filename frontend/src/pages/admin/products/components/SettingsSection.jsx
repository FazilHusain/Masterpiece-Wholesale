import { Card, Input, Select, Switch, Textarea } from "../../../../components/ui";

export default function SettingsSection({
  formData,
  setFormData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#12312B]">
          Product Settings
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Configure visibility and product settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Featured */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E8E2D9] p-5 transition hover:border-[#B68C2F]">
          <div>
            <h3 className="font-semibold text-[#12312B]">Featured Product</h3>
            <p className="mt-1 text-sm text-gray-500">
              Highlight this product across the website.
            </p>
          </div>

          <Switch
            checked={formData.isFeatured}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                isFeatured: value,
              }))
            }
          />
        </div>

        {/* Best Seller */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E8E2D9] p-5 transition hover:border-[#B68C2F]">
          <div>
            <h3 className="font-semibold text-[#12312B]">Best Seller</h3>
            <p className="mt-1 text-sm text-gray-500">
              Display this product as a best seller.
            </p>
          </div>

          <Switch
            checked={formData.isBestSeller}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                isBestSeller: value,
              }))
            }
          />
        </div>

        {/* New Arrival */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E8E2D9] p-5 transition hover:border-[#B68C2F]">
          <div>
            <h3 className="font-semibold text-[#12312B]">New Arrival</h3>
            <p className="mt-1 text-sm text-gray-500">
              Mark this product as newly launched.
            </p>
          </div>

          <Switch
            checked={formData.isNew}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                isNew: value,
              }))
            }
          />
        </div>

        {/* Active */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E8E2D9] p-5 transition hover:border-[#B68C2F]">
          <div>
            <h3 className="font-semibold text-[#12312B]">Active</h3>
            <p className="mt-1 text-sm text-gray-500">
              Make this product visible in the catalog.
            </p>
          </div>

          <Switch
            checked={formData.isActive}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                isActive: value,
              }))
            }
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Select
          label="Visibility"
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          options={[
            {
              label: "Both (Website & Trade)",
              value: "both",
            },
            {
              label: "Trade Only",
              value: "trade",
            },
            {
              label: "Customer Only",
              value: "customer",
            },
          ]}
        />

        <Input
          type="number"
          label="Display Order"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
          placeholder="0"
        />
      </div>

      <div className="mt-6">
        <Input
          label="Tags"
          name="tags"
          value={
            Array.isArray(formData.tags)
              ? formData.tags.join(", ")
              : formData.tags
          }
          onChange={(e) =>
            handleChange({
              target: {
                name: "tags",
                value: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              },
            })
          }
          placeholder="Luxury, Handmade, Wool, Export"
        />

        <p className="mt-2 text-xs text-gray-500">
          Separate multiple tags using commas.
        </p>
      </div>

      <div className="mt-6">
        <Textarea
          label="Admin Note"
          name="adminNote"
          value={formData.adminNote}
          onChange={handleChange}
          rows={5}
          placeholder="Internal notes..."
        />
      </div>
    </Card>
  );
}
