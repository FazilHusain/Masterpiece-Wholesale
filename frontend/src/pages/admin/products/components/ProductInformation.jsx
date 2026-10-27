import { Card, Input, Textarea } from "../../../../components/ui";

export default function ProductInformation({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#12312B]">
          Product Information
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Enter detailed product specifications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Material"
          name="material"
          value={formData.material}
          onChange={handleChange}
          placeholder="100% Wool"
        />

        <Input
          label="Pattern"
          name="pattern"
          value={formData.pattern}
          onChange={handleChange}
          placeholder="Modern"
        />

        <Input
          label="Color Family"
          name="colorFamily"
          value={formData.colorFamily}
          onChange={handleChange}
          placeholder="Blue"
        />

        <Input
          label="Hs Code"
          name="hsCode"
          value={formData.hsCode}
          onChange={handleChange}
          placeholder="Blue"
        />

        <Input
          label="Country of Origin"
          name="countryOfOrigin"
          value={formData.countryOfOrigin}
          onChange={handleChange}
          placeholder="India"
        />

        <Input
          label="Lead Time"
          name="leadTime"
          value={formData.leadTime}
          onChange={handleChange}
          placeholder="20 - 30 Days"
        />
      </div>

      <div className="mt-6">
        <Textarea
          label="Care Instructions"
          name="careInstructions"
          value={formData.careInstructions}
          onChange={handleChange}
          rows={5}
          placeholder="Vacuum regularly. Avoid direct sunlight..."
        />
      </div>
    </Card>
  );
}