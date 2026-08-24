import {
  CheckCircle,
  Loader2,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";

export default function ActionButtons({
  application,
  onApprove,
  onReject,
  onDelete,
  loading = false,
}) {
  const status = application?.status || "Pending";

  const getStatusClasses = () => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Reviewing":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <h2 className="text-lg font-semibold text-gray-900">Actions</h2>

      {/* Status */}

      <div className="mt-5 rounded-xl border bg-gray-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Current Status
        </p>

        <span
          className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses()}`}
        >
          {status}
        </span>
      </div>

      {/* Primary Actions */}

      <div className="mt-6 space-y-3">
        {status !== "Approved" && (
          <button
            type="button"
            disabled={loading}
            onClick={onApprove}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                Approve Application
              </>
            )}
          </button>
        )}

        {status !== "Rejected" && (
          <button
            type="button"
            disabled={loading}
            onClick={onReject}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              <>
                <XCircle size={18} />
                Reject Application
              </>
            )}
          </button>
        )}
      </div>

      {/* Info */}

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="mt-0.5 text-blue-600" />

          <div>
            <p className="text-sm font-semibold text-blue-700">Admin Notice</p>

            <p className="mt-1 text-sm leading-6 text-blue-600">
              Once an application is approved, the trade customer can receive
              account access and log in to the Trade Portal.
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}

      <div className="mt-8 border-t pt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-red-600">
          Danger Zone
        </h3>

        <button
          type="button"
          disabled={loading}
          onClick={onDelete}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-5 py-3 font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 size={18} />
              Delete Application
            </>
          )}
        </button>

        <p className="mt-3 text-xs leading-5 text-gray-500">
          Deleting this application is permanent and cannot be undone.
        </p>
      </div>
    </div>
  );
}
