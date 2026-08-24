import { useSelector } from "react-redux";

import { Card, Input, Select, Textarea } from "../../../../components/ui";

export default function BasicInformation({
  formData,
  errors,
  handleChange,
  initialValues,
}) {
  const { collections } = useSelector(
    (state) => state.collection
  );

  const { categories } = useSelector(
    (state) => state.category
  );

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter category details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Category Name */}

        <Input
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Luxury Rugs"
        />

        {/* Collection */}

        <Select
          label="Collection"
          name="collection"
          value={formData.collection}
          onChange={handleChange}
          error={errors.collection}
          options={[
            {
              label: "Select Collection",
              value: "",
            },

            ...collections.map((item) => ({
              label: item.name,
              value: item._id,
            })),
          ]}
        />

        {/* Parent Category */}

        <Select
          label="Sub Category"
          name="parentCategory"
          value={formData.parentCategory}
          onChange={handleChange}
          options={[
            {
              label: "None",
              value: "",
            },

            ...categories
              .filter(
                (item) =>
                  item._id !== initialValues?._id
              )
              .map((item) => ({
                label: item.name,
                value: item._id,
              })),
          ]}
        />
      </div>

      {/* Description */}

      <div className="mt-6">
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          placeholder="Write category description..."
        />
      </div>
    </Card>
  );
}