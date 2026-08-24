import { Edit2, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import { Badge, StatusBadge, Button } from "../../../components/ui";

export default function CategoryTable({
  categories = [],
  loading,
  onDelete,
}) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "image",
      title: "Category",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-xl border border-[#E8E2D9] bg-gray-100">
            {row.image ? (
              <img
                src={row.image}
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
              {row.name}
            </h3>

            {/* <p className="line-clamp-1 text-xs text-gray-500">
              {row.description || "-"}
            </p> */}
          </div>
        </div>
      ),
    },

    {
      key: "collection",
      title: "Collection",
      render: (row) => row.collection?.name || "-",
    },

    {
      key: "parentCategory",
      title: "Parent",
      render: (row) => row.parentCategory?.name || "-",
    },

    {
      key: "featured",
      title: "Featured",
      render: (row) =>
        row.isFeatured ? (
          <Badge variant="warning">
            Featured
          </Badge>
        ) : (
          "-"
        ),
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
      key: "order",
      title: "Order",
      render: (row) => row.displayOrder ?? 0,
    },

    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(`/admin/categories/${row._id}/edit`)
            }
          >
            <Edit2 size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(`/admin/categories/${row._id}`)
            }
          >
            <Eye size={16} />
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete?.(row)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={categories}
      loading={loading}
      emptyMessage="No categories found"
    />
  );
}