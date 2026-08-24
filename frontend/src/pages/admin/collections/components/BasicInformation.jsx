import { Card, Input, Textarea } from "../../../../components/ui";

export default function BasicInformation({
  formData,
  errors,
  handleChange,
}) {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-[#17342F]">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Basic information about this collection.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        <Input
          label="Collection Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Table Linen"
        />

        <Input
          label="Display Order"
          type="number"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
          placeholder="0"
        />

      </div>

      <div className="mt-5">

        <Textarea
          label="Short Description"
          name="shortDescription"
          rows={3}
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Small description..."
        />

      </div>

      <div className="mt-5">

        <Textarea
          label="Description"
          name="description"
          rows={6}
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description..."
        />

      </div>

    </Card>
  );
}