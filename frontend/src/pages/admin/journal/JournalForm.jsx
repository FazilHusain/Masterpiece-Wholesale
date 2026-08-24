import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui";

import BasicInformation from "./components/BasicInformation";
import ContentSection from "./components/ContentSection";
import MediaSection from "./components/MediaSection";
import SeoSection from "./components/SeoSection";
import SettingsSection from "./components/SettingsSection";


// ==========================================
// FORMAT DATE FOR <input type="date">
// ==========================================

const formatDateForInput = (date) => {
  if (!date) return "";

  // Already correct format
  if (
    typeof date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return date;
  }

  // ISO date:
  // 2026-08-13T00:00:00.000Z
  if (typeof date === "string") {
    return date.split("T")[0];
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
};


export default function JournalForm({
  initialValues = {},
  mode = "create",
  onSubmit,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    /* BASIC */

    title: "",
    slug: "",
    author: "His Masterpiece",

    category: "",

    shortDescription: "",

    /* CONTENT */

    content: "",

    /* MEDIA */

    featuredImage: [],

    /* SEO */

    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],

    /* SETTINGS */

    isFeatured: false,

    isActive: true,

    displayOrder: 0,

    publishedAt: "",

    ...initialValues,

    // Important:
    // Initial date ko input ke format me rakho
    publishedAt: formatDateForInput(
      initialValues?.publishedAt
    ),
  });


  const [errors, setErrors] = useState({});


  // ==========================================
  // LOAD EDIT DATA
  // ==========================================

  useEffect(() => {
    if (mode !== "edit" || !initialValues?._id) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      ...initialValues,

      // FIX DATE
      publishedAt: formatDateForInput(
        initialValues.publishedAt
      ),

      // FIX FEATURED IMAGE
      featuredImage: initialValues.featuredImage
        ? Array.isArray(initialValues.featuredImage)
          ? initialValues.featuredImage
          : [initialValues.featuredImage]
        : [],
    }));
  }, [mode, initialValues]);


  // ==========================================
  // INPUT CHANGE
  // ==========================================

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


  // ==========================================
  // VALIDATION
  // ==========================================

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Journal title is required.";
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription =
        "Short description is required.";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit?.({
      ...formData,

      metaKeywords:
        typeof formData.metaKeywords === "string"
          ? formData.metaKeywords
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : formData.metaKeywords,
    });
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <BasicInformation
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />


      <ContentSection
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />


      <MediaSection
        formData={formData}
        setFormData={setFormData}
        journalId={formData?._id}
      />


      <SeoSection
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />


      <SettingsSection
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
      />


      <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-lg">

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            navigate("/admin/journal")
          }
        >
          Cancel
        </Button>


        <Button type="submit">
          {mode === "create"
            ? "Create Journal"
            : "Update Journal"}
        </Button>

      </div>
    </form>
  );
}