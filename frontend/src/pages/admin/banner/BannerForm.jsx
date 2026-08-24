import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui";

import BasicInformation from "./components/BasicInformation";
import MediaSection from "./components/MediaSection";
import SettingsSection from "./components/SettingsSection";

export default function BannerForm({
  initialValues = {},
  mode = "create",
  onSubmit,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",

    buttonText: "",
    buttonLink: "",

    desktopImage: "",
    mobileImage: "",

    page: "Home",
    type: "Hero",

    displayOrder: 0,

    startDate: "",
    endDate: "",

    isActive: true,

    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && initialValues?._id) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,
      }));
    }
  }, [mode, initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title required";
    }

    if (!formData.page) {
      newErrors.page = "Select page";
    }

    if (!formData.type) {
      newErrors.type = "Select banner type";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInformation
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <MediaSection formData={formData} setFormData={setFormData} />

      <SettingsSection
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
      />

      <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-lg">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/banner")}
        >
          Cancel
        </Button>

        <Button type="submit">
          {mode === "create" ? "Create Banner" : "Update Banner"}
        </Button>
      </div>
    </form>
  );
}
