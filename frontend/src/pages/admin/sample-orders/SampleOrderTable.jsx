import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import { Button, StatusBadge } from "../../../components/ui";

export default function SampleOrderTable({
  orders = [],
  loading,
  onDelete,
}) {
  const navigate = useNavigate();

 const columns = [
  {
    key: "orderNumber",      // ← Change `accessor` to `key`
    title: "Order",          // ← Change `header` to `title`
  },

  {
    key: "customerName",
    title: "Customer",
    render: (row) => (       // ← Change `cell` to `render`
      <div>
        <p className="font-semibold">{row.customerName}</p>
        <p className="text-xs text-gray-500">
          {row.companyName || "Individual Customer"}
        </p>
      </div>
    ),
  },

  {
    key: "product",
    title: "Product",
    render: (row) => (
      <div>
        <p className="font-medium">{row.product?.name || "-"}</p>
        <p className="text-xs text-gray-500">{row.product?.sku || "-"}</p>
      </div>
    ),
  },

  {
    key: "quantity",
    title: "Qty",
    render: (row) => `${row.quantity || 0} ${row.unit || ""}`,
  },

  {
    key: "status",
    title: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },

  {
    key: "createdAt",
    title: "Created",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },

  {
    key: "actions",
    title: "Actions",
    render: (row) => (
      <Button
        size="sm"
        variant="outline"
        onClick={() => navigate(`/admin/sample-orders/${row._id}`)}
      >
        <Eye size={16} />
      </Button>
    ),
  },
];

  return (
    <DataTable
      columns={columns}
      data={orders}
      loading={loading}
      emptyMessage="No sample orders found."
    />
  );
}