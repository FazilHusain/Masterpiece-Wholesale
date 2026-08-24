import { useSelector } from "react-redux";

import AdminTableRow from "./AdminTableRow";
import { EmptyState } from "../../../../components/ui";

const AdminTable = ({ onEdit, onDelete, onResetPassword, onToggleStatus }) => {
  const { admins, loading } = useSelector((state) => state.admin);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">Loading admins...</p>
      </div>
    );
  }

  if (!admins.length) {
    return (
      <EmptyState
        title="No Admins Found"
        description="There are no administrator accounts available."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <AdminTableRow
                key={admin._id}
                admin={admin}
                onEdit={onEdit}
                onDelete={onDelete}
                onResetPassword={onResetPassword}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
