import { Card, Input, Textarea } from "../../../../components/ui";

export default function SeoSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#12312B]">
          SEO Information
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Optimize this product for search engines.
        </p>
      </div>

      <div className="space-y-6">

        <Input
          label="Meta Title"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
          placeholder="Luxury Handmade Carpet | His Masterpiece"
        />

        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Write an SEO friendly meta description..."
        />

        <Input
          label="Search Keywords"
          name="searchKeywords"
          value={
            Array.isArray(formData.searchKeywords)
              ? formData.searchKeywords.join(", ")
              : formData.searchKeywords
          }
          onChange={(e) =>
            handleChange({
              target: {
                name: "searchKeywords",
                value: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              },
            })
          }
          placeholder="Luxury Rug, Handmade Carpet, Wool Rug"
        />

      </div>
    </Card>
  );
}