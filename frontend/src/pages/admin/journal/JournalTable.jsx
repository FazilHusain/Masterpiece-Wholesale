import { Edit2, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/table/DataTable";
import { Button, StatusBadge, Badge } from "../../../components/ui";

export default function JournalTable({
  journals = [],
  loading,
  onDelete,
}) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "journal",

      title: "Journal",

      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-xl border border-[#E8E2D9] bg-gray-100">
            {row.featuredImage ? (
              <img
                src={row.featuredImage}
                alt={row.title}
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
              {row.title?.split(" ").slice(0, 1).join(" ")}
              {row.title?.split(" ").length > 1 ? "..." : ""}
            </h3>
          </div>
        </div>
      ),
    },

    {
      key: "author",

      title: "Author",

      render: (row) => row.author || "-",
    },

    {
      key: "category",

      title: "Category",

      render: (row) => row.category || "-",
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
      key: "published",

      title: "Published",

      render: (row) =>
        row.publishedAt
          ? new Date(
              row.publishedAt
            ).toLocaleDateString()
          : "-",
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
              navigate(`/admin/journal/${row._id}/edit`)
            }
          >
            <Edit2 size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(`/admin/journal/${row._id}`)
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
      data={journals}
      loading={loading}
      emptyMessage="No journal articles found."
    />
  );
}