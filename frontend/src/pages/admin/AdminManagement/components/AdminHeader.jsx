import { useSelector } from "react-redux";
import { Plus, RefreshCcw, ShieldCheck } from "lucide-react";

const AdminHeader = ({
  onAddAdmin,
  onRefresh,
}) => {
  const { pagination, loading } = useSelector(
    (state) => state.admin
  );

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-emerald-600" />

          <h1 className="text-2xl font-bold text-gray-900">
            Admin Management
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Manage all administrator accounts, roles and permissions.
        </p>

        <div className="mt-3 inline-flex rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
          Total Admins : {pagination.total}
        </div>
      </div>

      {/* Right */}

      <div className="flex gap-3">

        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              loading ? "animate-spin" : ""
            }`}
          />

          Refresh
        </button>

        <button
          onClick={onAddAdmin}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          <Plus size={18} />

          Add Admin
        </button>

      </div>

    </div>
  );
};

export default AdminHeader;