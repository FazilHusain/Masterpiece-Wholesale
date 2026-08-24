import Card from "../../../../components/ui/Card";
import Textarea from "../../../../components/ui/Textarea";

export default function NotesSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Notes
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Customer message and internal admin notes.
        </p>
      </div>

      <div className="space-y-6">

        <Textarea
          label="Customer Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
        />

        <Textarea
          label="Admin Note"
          name="adminNote"
          value={formData.adminNote}
          onChange={handleChange}
          rows={5}
        />

      </div>
    </Card>
  );
}