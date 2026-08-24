import { Search, RotateCcw } from "lucide-react";

export default function Filters({
  search,
  setSearch,

  status,
  setStatus,

  onReset,
}) {
  return (
    <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by name, business or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="h-11 w-full rounded-lg border pl-10 pr-4 outline-none transition focus:border-black"
          />

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="h-11 rounded-lg border px-3 outline-none focus:border-black"
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Reviewing">
            Reviewing
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>

        </select>

        {/* Reset */}

        <button
          onClick={onReset}
          className="flex h-11 items-center justify-center gap-2 rounded-lg border hover:bg-gray-50"
        >
          <RotateCcw size={18} />

          Reset Filters
        </button>

      </div>

    </div>
  );
}