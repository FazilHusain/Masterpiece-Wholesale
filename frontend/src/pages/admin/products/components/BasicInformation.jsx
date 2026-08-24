import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Card, Input, Select, Textarea } from "../../../../components/ui";

export default function BasicInformation({
  formData,
  errors,
  handleChange,
}) {
  const { collections = [] } = useSelector(
    (state) => state.collection
  );

  const { categories = [] } = useSelector(
    (state) => state.category
  );

  const filteredCategories = useMemo(() => {
    if (!formData.collection) return [];

    return categories.filter(
      (item) =>
        item.collection?._id === formData.collection ||
        item.collection === formData.collection
    );
  }, [categories, formData.collection]);

  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#12312B]">
          Basic Information
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Enter the basic information about the product.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Luxury Handmade Carpet"
        />

        <Input
          label="SKU"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          error={errors.sku}
          placeholder="HM-RUG-001"
        />

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

        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          options={[
            {
              label: "Select Category",
              value: "",
            },

            ...filteredCategories.map((item) => ({
              label: item.name,
              value: item._id,
            })),
          ]}
        />

      </div>

      <div className="mt-6">

        <Textarea
          label="Short Description"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          rows={3}
          placeholder="Short summary of the product..."
        />

      </div>

      <div className="mt-6">

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={7}
          placeholder="Write a detailed description..."
        />

      </div>
    </Card>
  );
}