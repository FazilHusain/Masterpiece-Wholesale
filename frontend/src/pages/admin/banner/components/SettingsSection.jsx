import { Card, Input, Switch } from "../../../../components/ui";

export default function SettingsSection({
  formData,
  handleChange,
  setFormData,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Settings
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          type="number"
          label="Display Order"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
        />

        <Input
          type="date"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <Input
          type="date"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

      </div>

      <div className="mt-6">

        <Switch
          label="Active Banner"
          checked={formData.isActive}
          onChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              isActive: checked,
            }))
          }
        />

      </div>
    </Card>
  );
}