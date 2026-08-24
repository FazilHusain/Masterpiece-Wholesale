import { Edit2, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function ProductTable({ products = [], loading, onDelete }) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "product",
      title: "Product",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-xl border border-[#E8E2D9] bg-gray-100">
            {row.featuredImage ? (
              <img
                src={row.featuredImage}
                alt={row.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-[#12312B]">
              {row.name?.split(" ").slice(0, 1).join(" ")}
              {row.name?.split(" ").length > 1 ? "..." : ""}
            </h3>

            {/* <p className="line-clamp-1 text-xs text-gray-500">
              {row.shortDescription || "-"}
            </p> */}
          </div>
        </div>
      ),
    },

    {
      key: "sku",
      title: "SKU",
      render: (row) => <span className="font-medium">{row.sku}</span>,
    },

    {
      key: "collection",
      title: "Collection",
      render: (row) => row.collection?.name || "-",
    },

    {
      key: "category",
      title: "Category",
      render: (row) => row.category?.name || "-",
    },

    // {
    //   key: "visibility",
    //   title: "Visibility",
    //   render: (row) => <Badge variant="secondary">{row.visibility}</Badge>,
    // },

    {
      key: "featured",
      title: "Featured",
      render: (row) =>
        row.isFeatured ? <Badge variant="warning">Featured</Badge> : "-",
    },

    {
      key: "status",
      title: "Status",
      render: (row) => (
        <StatusBadge
          status={row.isActive}
          activeText="Active"
          inactiveText="Inactive"
        />
      ),
    },

    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/products/${row._id}/edit`)}
          >
            <Edit2 size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/products/${row._id}`)}
          >
            <Eye size={16} />
          </Button>

          <Button variant="danger" size="sm" onClick={() => onDelete?.(row)}>
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      loading={loading}
      emptyMessage="No products found."
    />
  );
}
