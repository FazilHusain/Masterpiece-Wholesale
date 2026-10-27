import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import { Button, StatusBadge } from "../../../components/ui";

const formatCurrency = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  } catch {
    return `${currency} ${Number(amount) || 0}`;
  }
};

export default function SampleOrderTable({
  orders = [],
  loading,
}) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "orderNumber",
      title: "Order",
      render: (row) => row.orderNumber || "-",
    },
    {
      key: "customerName",
      title: "Customer",
      render: (row) => (
        <div>
          <p className="font-semibold">{row.customerName || "-"}</p>
          <p className="text-xs text-gray-500">
            {row.companyName || "Individual Customer"}
          </p>
        </div>
      ),
    },
    {
      key: "product",
      title: "Products",
      render: (row) => {
        const items =
          Array.isArray(row.items) && row.items.length > 0
            ? row.items
            : row.product
              ? [
                  {
                    product: row.product,
                    sku: row.sku,
                    quantity: row.quantity,
                  },
                ]
              : [];

        return (
          <div className="min-w-[180px] space-y-2">
            {items.length > 0 ? (
              <>
                {items.slice(0, 2).map((item, index) => (
                  <div
                    key={`${item.product?._id || item.sku || index}-${index}`}
                  >
                    <p className="font-medium">
                      {item.product?.name || "Product"}
                    </p>
                    <p className="text-xs text-gray-500">
                      SKU: {item.sku || item.product?.sku || "-"}
                    </p>
                  </div>
                ))}

                {items.length > 2 && (
                  <p className="text-xs text-gray-500">
                    +{items.length - 2} more product(s)
                  </p>
                )}
              </>
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </div>
        );
      },
    },
    {
      key: "quantity",
      title: "Total Qty",
      render: (row) => {
        if (Array.isArray(row.items) && row.items.length > 0) {
          return row.items.reduce(
            (total, item) => total + (Number(item.quantity) || 0),
            0
          );
        }

        return Number(row.quantity) || 0;
      },
    },
    {
      key: "grandTotal",
      title: "Total",
      render: (row) => {
        const total =
          row.grandTotal != null
            ? Number(row.grandTotal)
            : Array.isArray(row.items) && row.items.length > 0
              ? row.items.reduce(
                  (sum, item) =>
                    sum +
                    (item.total != null
                      ? Number(item.total) || 0
                      : (Number(item.quantity) || 0) *
                        (Number(item.samplePrice) || 0)),
                  0
                )
              : (Number(row.quantity) || 0) *
                (Number(row.samplePrice) || 0);

        return formatCurrency(total, row.currency || "USD");
      },
    },
    {
      key: "status",
      title: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      title: "Created",
      render: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString()
          : "-",
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