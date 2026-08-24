import { Card, Select, Input } from "../../../../components/ui";

const statusOptions = [
  {
    label: "Active",
    value: true,
  },
  {
    label: "Inactive",
    value: false,
  },
];

const featuredOptions = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

export default function SettingsSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Journal Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure publishing and display options.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Select
          label="Status"
          name="isActive"
          value={formData.isActive}
          onChange={handleChange}
          options={statusOptions}
        />

        <Select
          label="Featured Article"
          name="isFeatured"
          value={formData.isFeatured}
          onChange={handleChange}
          options={featuredOptions}
        />

        <Input
          type="number"
          label="Display Order"
          name="displayOrder"
          value={formData.displayOrder || 0}
          onChange={handleChange}
          placeholder="0"
        />

        <Input
          type="date"
          label="Publish Date"
          name="publishedAt"
          value={formData.publishedAt || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mt-8 rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-6">
        <h3 className="text-lg font-semibold text-[#12312B]">
          Publishing Information
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Current Status
            </p>

            <p className="mt-1 font-medium text-[#12312B]">
              {formData.isActive
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Featured
            </p>

            <p className="mt-1 font-medium text-[#12312B]">
              {formData.isFeatured
                ? "Yes"
                : "No"}
            </p>
          </div>

        </div>
      </div>
    </Card>
  );
}