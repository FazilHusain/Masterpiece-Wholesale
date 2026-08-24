import { Card, Select, Input, Textarea } from "../../../../components/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "../../../../redux/category";

const categoryOptions = [
  { label: "Select Category", value: "" },
  { label: "Craft Process", value: "Craft Process" },
  { label: "Design Story", value: "Design Story" },
  { label: "Retail Guide", value: "Retail Guide" },
  { label: "Sustainability", value: "Sustainability" },
  { label: "Collections", value: "Collections" },
];

export default function BasicInformation({ formData, handleChange }) {
  const dispatch = useDispatch();

  const { categories = [] } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter journal article details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Journal Title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Enter journal title"
          required
        />

        <Input
          label="Author"
          name="author"
          value={formData.author || ""}
          onChange={handleChange}
          placeholder="His Masterpiece"
        />

        {/* <Select
          label="Category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          options={[
            {
              label: "Select Category",
              value: "",
            },

            ...categories.map((item) => ({
              label: item.name,
              value: item._id,
            })),
          ]}
          required
        /> */}

        <Select
          label="Category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          options={categoryOptions}
          required
        />

        <Input
          type="date"
          label="Published Date"
          name="publishedAt"
          value={formData.publishedAt || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <Textarea
          label="Short Description"
          name="shortDescription"
          value={formData.shortDescription || ""}
          onChange={handleChange}
          rows={5}
          placeholder="Write a short introduction..."
        />
      </div>
    </Card>
  );
}
