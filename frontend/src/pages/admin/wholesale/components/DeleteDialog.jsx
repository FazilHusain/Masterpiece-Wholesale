import {
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function DeleteDialog({
  open,
  onClose,
  onDelete,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="p-6">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle
              className="text-red-600"
              size={28}
            />

          </div>

          <h2 className="mt-5 text-center text-xl font-semibold">
            Delete Application?
          </h2>

          <p className="mt-2 text-center text-gray-500">

            This action cannot be undone.

          </p>

        </div>

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onDelete}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-white"
          >
            {loading && (
              <Loader2
                className="animate-spin"
                size={18}
              />
            )}

            Delete
          </button>

        </div>

      </div>

    </div>
  );
}