import { X, FileText } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminNoteModal({
  open,
  onClose,
  order,
  onSave,
}) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order?.adminNote) {
      setNote(order.adminNote);
    } else {
      setNote("");
    }
  }, [order]);

  if (!open) return null;

  const handleSave = async () => {
    try {
      setLoading(true);

      await onSave(note);

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#173724]/10">
              <FileText className="text-[#173724]" size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#173724]">
                Admin Note
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Internal notes are only visible to administrators.
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <label className="mb-3 block text-sm font-semibold text-[#173724]">
            Write Note
          </label>

          <textarea
            rows={8}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write internal note for this quick order..."
            className="w-full resize-none rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-[#173724] focus:ring-2 focus:ring-[#173724]/20"
          />

          <div className="mt-2 flex justify-end text-xs text-gray-400">
            {note.length} characters
          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t p-6 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-xl bg-[#173724] px-8 py-3 font-medium text-white transition hover:bg-[#0f281b] disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Note"}
          </button>

        </div>

      </div>
    </div>
  );
}