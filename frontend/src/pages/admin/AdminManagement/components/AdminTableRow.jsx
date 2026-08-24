import { SquarePen, Trash2, KeyRound } from "lucide-react";
import { Switch } from "../../../../components/ui";

const AdminTableRow = ({
  admin,
  onEdit,
  onDelete,
  onResetPassword,
  onToggleStatus,
}) => {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      {/* Name */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 uppercase">
            {admin?.name?.charAt(0)}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">{admin.name}</h4>

            <p className="text-sm text-gray-500">ID : {admin._id.slice(-6)}</p>
          </div>
        </div>
      </td>

      {/* Email */}

      <td className="px-6 py-4">
        <span className="text-sm text-gray-700">{admin.email}</span>
      </td>

      {/* Role */}

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold

          ${
            admin.role === "super-admin"
              ? "bg-red-100 text-red-700"
              : admin.role === "admin"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {admin.role}
        </span>
      </td>

      {/* Status */}

      <td className="px-6 py-4">
        <Switch
          checked={admin.isActive}
          onChange={() => onToggleStatus(admin)}
        />
      </td>

      {/* Created */}

      <td className="px-6 py-4 text-sm text-gray-600">
        {new Date(admin.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {/* Edit */}

          <button
            onClick={() => onEdit(admin)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
            title="Edit"
          >
            <SquarePen size={18} />
          </button>

          {/* Reset Password */}

          <button
            onClick={() => onResetPassword(admin)}
            className="rounded-lg bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"
            title="Reset Password"
          >
            <KeyRound size={18} />
          </button>

          {/* Delete */}

          <button
            onClick={() => onDelete(admin)}
            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminTableRow;
