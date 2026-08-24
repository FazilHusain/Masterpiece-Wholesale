import { Card, Switch, Input } from "../../../../components/ui";

export default function SettingsSection({
  formData,
  setFormData,
  handleChange,
}) {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-[#17342F]">
          Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure collection visibility and display options.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="flex items-center justify-between rounded-xl border border-[#E8E2D9] p-4">

          <div>
            <h4 className="font-medium">
              Featured Collection
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Highlight this collection.
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

        <div className="flex items-center justify-between rounded-xl border border-[#E8E2D9] p-4">

          <div>
            <h4 className="font-medium">
              Show On Homepage
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Display this collection on homepage.
            </p>
          </div>

          <Switch
            checked={formData.showOnHomepage}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                showOnHomepage: value,
              }))
            }
          />

        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#E8E2D9] p-4">

          <div>
            <h4 className="font-medium">
              Active
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Enable this collection.
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

        <Input
          type="number"
          label="Display Order"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
          placeholder="0"
        />

      </div>

    </Card>
  );
}