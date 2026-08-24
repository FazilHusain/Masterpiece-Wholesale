import {
  Download,
  RefreshCw,
  Trash2,
} from "lucide-react";

export default function DataTableToolbar({
  selectedRows = [],
  loading,
  onRefresh,
  onExport,
  onDelete,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

      <div>

        <h3 className="font-semibold">
          Applications
        </h3>

        <p className="text-sm text-gray-500">
          {selectedRows.length} selected
        </p>

      </div>

      <div className="flex flex-wrap gap-2">

        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          <RefreshCw size={17} />

          Refresh
        </button>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          <Download size={17} />

          Export CSV
        </button>

        <button
          disabled={!selectedRows.length}
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-40"
        >
          <Trash2 size={17} />

          Delete Selected
        </button>

      </div>

    </div>
  );
}