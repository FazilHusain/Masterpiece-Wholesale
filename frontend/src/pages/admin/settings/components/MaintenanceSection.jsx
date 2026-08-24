import { Card, Switch } from "../../../../components/ui";

export default function MaintenanceSection({
  formData,
  setFormData,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Maintenance Mode
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enable or disable website maintenance mode.
        </p>
      </div>

      <Switch
        label="Enable Maintenance Mode"
        checked={formData.maintenanceMode || false}
        onChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            maintenanceMode: value,
          }))
        }
      />
    </Card>
  );
}