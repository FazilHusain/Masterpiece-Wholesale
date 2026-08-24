import { Card, Input, Textarea } from "../../../../components/ui";

export default function SeoSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          SEO Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Optimize this journal article for search engines.
        </p>
      </div>

      <div className="space-y-6">

        <Input
          label="Meta Title"
          name="metaTitle"
          value={formData.metaTitle || ""}
          onChange={handleChange}
          placeholder="Enter SEO title..."
          maxLength={60}
        />

        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={formData.metaDescription || ""}
          onChange={handleChange}
          rows={4}
          maxLength={160}
          placeholder="Enter SEO description..."
        />

        <Input
          label="Meta Keywords"
          name="metaKeywords"
          value={
            Array.isArray(formData.metaKeywords)
              ? formData.metaKeywords.join(", ")
              : formData.metaKeywords || ""
          }
          onChange={handleChange}
          placeholder="home textile, luxury bedding, bed sheets..."
        />

      </div>

      <div className="mt-8 rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-6">

        <h3 className="mb-4 text-lg font-semibold text-[#12312B]">
          Google Search Preview
        </h3>

        <p className="truncate text-lg font-medium text-[#1A0DAB]">
          {formData.metaTitle ||
            formData.title ||
            "Journal Title"}
        </p>

        <p className="mt-1 text-sm text-green-700">
          https://hismasterpiece.com/journal/
          {formData.slug || "journal-slug"}
        </p>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {formData.metaDescription ||
            formData.shortDescription ||
            "Your SEO description will appear here."}
        </p>

      </div>
    </Card>
  );
}