import Drawer from "../../../../components/ui/Drawer";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";
import { Info } from "lucide-react";

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
  { label: "Packed", value: "Packed" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
];

export default function StatusDrawer({
  open,
  onClose,
  value,
  onChange,
  onSave,
  loading,
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Update Sample Order Status"
    >
      <div className="space-y-6">

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-2">
            <Info
              size={18}
              className="mt-0.5 text-amber-600"
            />

            <div>
              <p className="text-sm font-semibold text-amber-700">
                Current Status
              </p>

              <p className="mt-1 text-sm text-amber-600">
                {value}
              </p>
            </div>
          </div>
        </div>

        <Select
          label="Order Status"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          options={statusOptions}
        />

        <p className="text-xs leading-6 text-gray-500">
          Updating the order status will be reflected in the customer's
          order history.
        </p>

        <div className="flex justify-end gap-3 border-t pt-5">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={onSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Status"}
          </Button>

        </div>

      </div>
    </Drawer>
  );
}