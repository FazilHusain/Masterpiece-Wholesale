import {
  Edit2,
  Eye,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import { Button, StatusBadge } from "../../../components/ui";

export default function BannerTable({
  banners = [],
  loading,
  onDelete,
}) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "banner",

      title: "Banner",

      render: (row) => (
        <div className="flex items-center gap-3">

          <img
            src={
              row.desktopImage ||
              "/images/placeholder.webp"
            }
            alt=""
            className="h-16 w-28 rounded-xl border object-cover"
          />

          <div>
            <h3 className="font-semibold">
              {row.title}
            </h3>

            <p className="text-xs text-gray-500">
              {row.page}
            </p>
          </div>

        </div>
      ),
    },

    {
      key: "type",

      title: "Type",

      render: (row) => row.type,
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
        <div className="flex gap-2">

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(
                `/admin/banner/${row._id}`
              )
            }
          >
            <Eye size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(
                `/admin/banner/${row._id}/edit`
              )
            }
          >
            <Edit2 size={16} />
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() =>
              onDelete(row)
            }
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
      data={banners}
      loading={loading}
      emptyMessage="No banners found."
    />
  );
}