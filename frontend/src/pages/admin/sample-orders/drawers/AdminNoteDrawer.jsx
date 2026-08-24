import { useEffect, useState } from "react";

import Drawer from "../../../../components/ui/Drawer";
import Button from "../../../../components/ui/Button";
import Textarea from "../../../../components/ui/Textarea";

export default function AdminNoteDrawer({
  open,
  onClose,
  note = "",
  onSave,
  loading,
}) {
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    if (open) {
      setAdminNote(note || "");
    }
  }, [open, note]);

  const handleSave = () => {
    onSave(adminNote);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Admin Note"
    >
      <div className="space-y-6">

        <Textarea
          label="Admin Note"
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          rows={8}
          placeholder="Write your note here..."
        />

        <div className="flex justify-end gap-3 border-t pt-5">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Note"}
          </Button>

        </div>

      </div>
    </Drawer>
  );
}