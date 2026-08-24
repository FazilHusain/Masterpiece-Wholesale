import { Eye, Check, Trash2 } from "lucide-react";
import DataTable from "../../../components/table/DataTable";
import { Badge, Button } from "../../../components/ui";

export default function ContactDataTable({
  contacts,
  loading,
  onView,
  onRead,
  onDelete,
}) {
  const columns = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "phone",
      title: "Phone",
    },
    {
      key: "subject",
      title: "Subject",
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <Badge
          variant={row.status === "Read" ? "success" : "warning"}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      title: "Created",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
       <div className="flex items-center justify-center gap-2 min-w-[130px]">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onView(row)}
          >
            <Eye size={16} />
          </Button>

          {row.status === "Unread" && (
            <Button
              size="sm"
              variant="success"
              onClick={() => onRead(row)}
            >
              <Check size={16} />
            </Button>
          )}

          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(row)}
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
      data={contacts}
      loading={loading}
      emptyMessage="No contacts found"
    />
  );
}