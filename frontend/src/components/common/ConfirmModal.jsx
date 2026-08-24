import { AlertTriangle, Loader2 } from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "red",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const buttonColor = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex flex-col items-center border-b p-6">
          <div className="mb-4 rounded-full bg-red-100 p-3">
            <AlertTriangle
              size={30}
              className="text-red-600"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
        </div>

        {/* Body */}

        <div className="px-6 py-5">
          <p className="text-center leading-7 text-gray-600">
            {message}
          </p>
        </div>

        {/* Footer */}

        <div className="flex gap-3 border-t p-5">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-100 disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-white transition disabled:opacity-60 ${
              buttonColor[confirmColor]
            }`}
          >
            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={18}
                />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}