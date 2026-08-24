import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import { Badge, StatusBadge, Button } from "../../../components/ui";
import { Eye } from "lucide-react";

export default function CollectionTable({
  collections = [],
  loading,
  onDelete,
}) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "image",
      title: "Collection",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-xl border bg-gray-100">
            {row.thumbnailImage ? (
              <img
                src={row.thumbnailImage}
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
            <h3 className="font-semibold text-[#17342F]">{row.name}</h3>

            {/* <p className="text-xs text-gray-500">
              {row.shortDescription || "-"}
            </p> */}
          </div>
        </div>
      ),
    },

    {
      key: "featured",
      title: "Featured",
      render: (row) =>
        row.isFeatured ? <Badge variant="warning">Featured</Badge> : "-",
    },

    {
      key: "homepage",
      title: "Homepage",
      render: (row) =>
        row.showOnHomepage ? <Badge variant="success">Visible</Badge> : "-",
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
            onClick={() => navigate(`/admin/collections/${row._id}/edit`)}
          >
            <Edit2 size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/collections/${row._id}`)}
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
    <div className="overflow-x-auto">
      <DataTable
        columns={columns}
        data={collections}
        loading={loading}
        emptyTitle="No Collections Found"
        emptyDescription="Create your first collection."
      />
    </div>
  );
}
