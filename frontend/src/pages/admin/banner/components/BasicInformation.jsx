import { Card, Input, Select, Textarea } from "../../../../components/ui";

const pageOptions = [
  { label: "Home", value: "Home" },
  { label: "About", value: "About" },
  { label: "Collections", value: "Collections" },
  { label: "Products", value: "Products" },
  { label: "Journal", value: "Journal" },
  { label: "Wholesale", value: "Wholesale" },
  { label: "Trade", value: "Trade" },
  { label: "Contact", value: "Contact" },
];

const typeOptions = [
  { label: "Hero", value: "Hero" },
  { label: "Middle", value: "Middle" },
  { label: "Bottom", value: "Bottom" },
  { label: "Offer", value: "Offer" },
];

export default function BasicInformation({
  formData,
  handleChange,
  errors,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Banner information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Banner Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />

        <Input
          label="Subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
        />

        <Input
          label="Button Text"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
        />

        <Input
          label="Button Link"
          name="buttonLink"
          value={formData.buttonLink}
          onChange={handleChange}
        />

        <Select
          label="Page"
          name="page"
          value={formData.page}
          onChange={handleChange}
          options={pageOptions}
        />

        <Select
          label="Banner Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={typeOptions}
        />
      </div>

      <div className="mt-6">
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
        />
      </div>
    </Card>
  );
}