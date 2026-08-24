import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  let start = Math.max(currentPage - 2, 1);
  let end = Math.min(start + 4, totalPages);

  if (end - start < 4) {
    start = Math.max(end - 4, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-16 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CDB8] bg-white text-[#183425] transition hover:border-[#B68C2F] hover:text-[#B68C2F] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {/* First Page */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CDB8] bg-white text-[#183425] transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
          >
            1
          </button>

          {start > 2 && (
            <span className="px-2 text-[#777]">...</span>
          )}
        </>
      )}

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition ${
            currentPage === page
              ? "border-[#183425] bg-[#183425] text-white"
              : "border-[#D8CDB8] bg-white text-[#183425] hover:border-[#B68C2F] hover:text-[#B68C2F]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-[#777]">...</span>
          )}

          <button
            onClick={() => onPageChange(totalPages)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CDB8] bg-white text-[#183425] transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CDB8] bg-white text-[#183425] transition hover:border-[#B68C2F] hover:text-[#B68C2F] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ProductPagination;