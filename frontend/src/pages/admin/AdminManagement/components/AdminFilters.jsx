import { Search, RotateCcw } from "lucide-react";

const AdminFilters = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      role: "",
      status: "",
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) =>
              handleChange("search", e.target.value)
            }
            className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* Role */}

        <select
          value={filters.role}
          onChange={(e) =>
            handleChange("role", e.target.value)
          }
          className="h-11 rounded-lg border border-gray-300 px-3 outline-none focus:border-emerald-500"
        >
          <option value="">All Roles</option>
          <option value="super-admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>

        {/* Status */}

        <select
          value={filters.status}
          onChange={(e) =>
            handleChange("status", e.target.value)
          }
          className="h-11 rounded-lg border border-gray-300 px-3 outline-none focus:border-emerald-500"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* Reset */}

        <button
          onClick={handleReset}
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 font-medium transition hover:bg-gray-100"
        >
          <RotateCcw size={16} />

          Reset Filters
        </button>

      </div>
    </div>
  );
};

export default AdminFilters;