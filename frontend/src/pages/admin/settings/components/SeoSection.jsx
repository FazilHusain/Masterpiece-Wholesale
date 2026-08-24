import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";

export default function SeoSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          SEO Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Default SEO settings for your website.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Meta Title"
          name="metaTitle"
          value={formData.metaTitle || ""}
          onChange={handleChange}
          placeholder="His Masterpiece | Luxury Home Textile Manufacturer"
        />

        <Input
          label="Website URL"
          name="websiteUrl"
          value={formData.websiteUrl || ""}
          onChange={handleChange}
          placeholder="https://hismasterpiece.com"
        />

      </div>

      <div className="mt-6">

        <Textarea
          label="Meta Description"
          name="metaDescription"
          rows={5}
          value={formData.metaDescription || ""}
          onChange={handleChange}
          placeholder="Enter default website meta description..."
        />

      </div>

      <div className="mt-6">

        <Input
          label="Meta Keywords"
          placeholder="bed sheets, table linen, cushion covers"
          value={(formData.metaKeywords || []).join(", ")}
          onChange={(e) =>
            handleChange({
              target: {
                name: "metaKeywords",
                value: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              },
            })
          }
        />

      </div>

    </Card>
  );
}