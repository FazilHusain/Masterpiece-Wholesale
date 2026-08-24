import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function DeleteModal({
  open,
  title = "Delete Item",
  description = "Are you sure you want to delete this item?",
  loading = false,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-[#E8E2D9] bg-white shadow-2xl"
      >
        {/* Header */}

        <div className="flex flex-col items-center border-b border-[#F2ECE3] px-8 py-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle
              size={38}
              className="text-red-600"
            />
          </div>

          <h2 className="mt-5 text-2xl font-semibold text-[#12312B]">
            {title}
          </h2>

          <p className="mt-3 text-center leading-7 text-gray-500">
            {description}
          </p>
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={onConfirm}
            className="w-full sm:w-auto"
          >
            Delete Forever
          </Button>
        </div>
      </div>
    </div>
  );
}