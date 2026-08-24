import { useState, useEffect } from "react";
import { StickyNote } from "lucide-react";

export default function AdminNotesCard({
  application,
  loading,
  onSave,
}) {
  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    setNotes(
      application?.adminNotes || "",
    );
  }, [application]);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <StickyNote size={20} />

        <h2 className="text-lg font-semibold">
          Admin Notes
        </h2>

      </div>

      <textarea
        rows={6}
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="w-full rounded-lg border p-3 outline-none focus:border-black"
        placeholder="Write internal notes..."
      />

      <button
        onClick={() => onSave(notes)}
        disabled={loading}
        className="mt-4 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Save Notes"}
      </button>

    </div>
  );
}