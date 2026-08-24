import { useEffect, useState } from "react";

import { Button } from "../../../components/ui";

import BasicInformation from "./components/BasicInformation";
import MediaSection from "./components/MediaSection";
import SeoSection from "./components/SeoSection";
import SettingsSection from "./components/SettingsSection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CategoryForm({
  initialValues,
  mode = "create",
  onSubmit,
}) {
  const normalizeImage = (image) => {
    if (!image) return [];

    if (Array.isArray(image)) {
      return image;
    }

    return [image];
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",

    image: [],
    bannerImage: [],

    collection: "",
    parentCategory: "",

    metaTitle: "",
    metaDescription: "",

    displayOrder: 0,

    isFeatured: false,
    isActive: true,

    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  const { loading } = useSelector((state) => state.category);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required.";
    }

    if (!formData.collection) {
      newErrors.collection = "Collection is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setFormData({
        ...initialValues,

        image: normalizeImage(initialValues.image),
        bannerImage: normalizeImage(initialValues.bannerImage),
      });
    }
  }, [mode, initialValues]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInformation
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        initialValues={initialValues}
      />

      <MediaSection formData={formData} setFormData={setFormData} />

      <SeoSection formData={formData} handleChange={handleChange} />

      <SettingsSection
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
      />

      <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-lg">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/categories")}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create Category"
              : "Update Category"}
        </Button>
      </div>
    </form>
  );
}
