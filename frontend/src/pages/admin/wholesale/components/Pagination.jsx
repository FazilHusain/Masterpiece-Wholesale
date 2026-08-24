import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">

      <button
        disabled={page === 1}
        onClick={() =>
          onChange(page - 1)
        }
        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        <ChevronLeft size={18} />

        Previous
      </button>

      <div className="font-medium">

        Page {page} of {totalPages}

      </div>

      <button
        disabled={page === totalPages}
        onClick={() =>
          onChange(page + 1)
        }
        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        Next

        <ChevronRight size={18} />

      </button>

    </div>
  );
}