import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";

export default function CompanySection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Company Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Basic website information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Website Name"
          name="websiteName"
          value={formData.websiteName || ""}
          onChange={handleChange}
          placeholder="His Masterpiece"
        />

        <Input
          label="Website Tagline"
          name="websiteTagline"
          value={formData.websiteTagline || ""}
          onChange={handleChange}
          placeholder="Luxury Home Textile Manufacturer"
        />

        <Input
          label="Website URL"
          name="websiteUrl"
          value={formData.websiteUrl || ""}
          onChange={handleChange}
          placeholder="https://hismasterpiece.com"
        />

      </div>
    </Card>
  );
}