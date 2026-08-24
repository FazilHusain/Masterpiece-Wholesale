import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";

export default function BusinessSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Business Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Currency and timezone settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <Input
          label="Currency"
          name="currency"
          value={formData.currency || ""}
          onChange={handleChange}
          placeholder="USD"
        />

        <Input
          label="Currency Symbol"
          name="currencySymbol"
          value={formData.currencySymbol || ""}
          onChange={handleChange}
          placeholder="$"
        />

        <Select
          label="Timezone"
          name="timezone"
          value={formData.timezone || ""}
          onChange={handleChange}
          options={[
            {
              label: "UTC",
              value: "UTC",
            },
            {
              label: "Asia/Kolkata",
              value: "Asia/Kolkata",
            },
            {
              label: "Europe/London",
              value: "Europe/London",
            },
            {
              label: "America/New_York",
              value: "America/New_York",
            },
          ]}
        />

      </div>
    </Card>
  );
}