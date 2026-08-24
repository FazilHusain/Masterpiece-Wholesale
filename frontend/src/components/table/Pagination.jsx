import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-2 rounded-xl border border-[#E8E2D9] px-4 py-2 disabled:opacity-50"
      >
        <ChevronLeft size={18} />

        Previous

      </button>

      <div className="text-sm text-gray-600">

        Page {page} of {totalPages}

      </div>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2 rounded-xl border border-[#E8E2D9] px-4 py-2 disabled:opacity-50"
      >
        Next

        <ChevronRight size={18} />

      </button>

    </div>
  );
}