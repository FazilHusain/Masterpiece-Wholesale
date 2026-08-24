import { Card} from "../../../../components/ui";
import Editor from "../../../../components/ui/Editor";

export default function ContentSection({
  formData,
  setFormData,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Journal Content
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Write the complete journal article. Formatting will be displayed on the website.
        </p>
      </div>

      <Editor
        label="Content"
        value={formData.content || ""}
        onChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            content: value,
          }))
        }
      />

      <div className="mt-6 rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-5">
        <h3 className="text-base font-semibold text-[#12312B]">
          Writing Tips
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
          <li>Use clear headings to organize the article.</li>
          <li>Keep paragraphs short for better readability.</li>
          <li>Add bullet points where appropriate.</li>
          <li>Use high-quality featured images.</li>
          <li>Optimize the content for SEO.</li>
        </ul>
      </div>
    </Card>
  );
}