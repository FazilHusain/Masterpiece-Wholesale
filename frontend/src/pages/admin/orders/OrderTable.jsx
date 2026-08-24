import {
  Eye,
  Package,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import { Button, StatusBadge, Badge } from "../../../components/ui";

export default function OrderTable({
  orders = [],
  loading,
}) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "orderNumber",
      title: "Order",
      render: (row) => (
        <div>
          <h3 className="font-semibold text-[#12312B]">
            {row.orderNumber}
          </h3>

          <p className="text-xs text-gray-500">
            {new Date(
              row.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      ),
    },

    {
      key: "customer",
      title: "Customer",
      render: (row) => (
        <div>
          <h3 className="font-medium">
            {row.customerName}
          </h3>

          <p className="text-xs text-gray-500">
            {row.email}
          </p>
        </div>
      ),
    },

    {
      key: "type",
      title: "Order Type",
      render: (row) => (
        <Badge
          variant={
            row.orderType === "sample"
              ? "warning"
              : "secondary"
          }
        >
          {row.orderType === "sample"
            ? "Sample"
            : "Wholesale"}
        </Badge>
      ),
    },

    {
      key: "items",
      title: "Items",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Package size={16} />

          {row.items?.length || 0}
        </div>
      ),
    },

    {
      key: "amount",
      title: "Amount",
      render: (row) => (
        <span className="font-semibold">
          ₹ {row.totalAmount || 0}
        </span>
      ),
    },

    {
      key: "payment",
      title: "Payment",
      render: (row) => (
        <Badge
          variant={
            row.paymentStatus === "paid"
              ? "success"
              : row.paymentStatus === "failed"
                ? "danger"
                : "secondary"
          }
        >
          {row.paymentStatus}
        </Badge>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (row) => (
        <StatusBadge
          status={
            row.status === "completed" ||
            row.status === "delivered"
          }
          activeText={row.status}
          inactiveText={row.status}
        />
      ),
    },

    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate(`/admin/orders/${row._id}`)
          }
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
      emptyTitle="No Orders Found"
      emptyDescription="Orders will appear here after successful purchases."
    />
  );
}