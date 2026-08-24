import { Card, Input, Textarea } from "../../../../components/ui";

export default function SeoSection({
  formData,
  handleChange,
}) {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-[#17342F]">
          SEO
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Optimize this collection for search engines.
        </p>

      </div>

      <div className="space-y-5">

        <Input
          label="Meta Title"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
          placeholder="Luxury Table Linen Collection"
        />

        <Textarea
          label="Meta Description"
          rows={4}
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          placeholder="Write a SEO friendly description..."
        />

        <Input
          label="Keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="table linen, handcrafted, luxury, cotton"
        />

      </div>

    </Card>
  );
}