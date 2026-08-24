import Card from "../../../../components/ui/Card";
import Select from "../../../../components/ui/Select";

const statusOptions = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
  {
    label: "Packed",
    value: "Packed",
  },
  {
    label: "Shipped",
    value: "Shipped",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
];

export default function StatusSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Order Status
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage current order status.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
        />

      </div>
    </Card>
  );
}