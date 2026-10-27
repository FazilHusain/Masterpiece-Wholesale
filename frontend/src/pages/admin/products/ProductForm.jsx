import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui";

import BasicInformation from "./components/BasicInformation";
import ProductInformation from "./components/ProductInformation";
import MediaSection from "./components/MediaSection";
import GallerySection from "./components/GallerySection";
import VideoSection from "./components/VideoSection";
import StorySection from "./components/StorySection";
import VariantSection from "./components/VariantSection";
import SampleSection from "./components/SampleSection";
import DownloadSection from "./components/DownloadSection";
import SeoSection from "./components/SeoSection";
import SettingsSection from "./components/SettingsSection";

import { fetchCollections } from "../../../redux/collection";
import { fetchCategories } from "../../../redux/category";

const normalizeImage = (image) => {
  if (!image) return [];

  if (Array.isArray(image)) {
    return image;
  }

  return [image];
};

const normalizeId = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value._id || value.id || "";
};

export default function ProductForm({
  initialValues = {},
  mode = "create",
  productId,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    /* BASIC */

    name: "",
    sku: "",
    shortDescription: "",
    description: "",

    collection: "",
    category: "",

    /* PRODUCT INFO */

    material: "",
    pattern: "",
    colorFamily: "",
    hsCode: "",
    countryOfOrigin: "India",
    leadTime: "",
    careInstructions: "",

    /* MEDIA */

    featuredImage: [],
    gallery: [],
    videos: [],

    /* STORY */

    storySections: [],

    /* SAMPLE */

    sample: {
      available: true,
      sku: "",
      price: 0,
      stock: 0,
    },

    /* WHOLESALE */

    variants: [],

    /* DOWNLOADS */

    downloads: [],

    /* SEO */

    metaTitle: "",
    metaDescription: "",
    searchKeywords: [],

    /* SETTINGS */

    isFeatured: false,
    isBestSeller: false,
    isNew: false,

    visibility: "both",

    isActive: true,

    displayOrder: 0,

    tags: [],

    relatedProducts: [],

    adminNote: "",

    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchCategories());
  }, [dispatch]);

  /* ==========================================
     EDIT DATA
  ========================================== */

  useEffect(() => {
    if (mode === "edit" && initialValues?._id) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,

        collection: normalizeId(initialValues.collection),

        category: normalizeId(initialValues.category),

        featuredImage: normalizeImage(initialValues.featuredImage),

        storySections: initialValues.storySections || [],

        gallery: initialValues.gallery || [],
      }));
    }
  }, [mode, initialValues]);

  /* ==========================================
     NORMAL INPUT CHANGE
  ========================================== */

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

  /* ==========================================
     VALIDATION
  ========================================== */

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required.";
    }

    if (!formData.collection) {
      newErrors.collection = "Collection is required.";
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ==========================================
     SUBMIT
  ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    /*
      CREATE MODE:

      Story image File ko normal JSON/FormData
      payload ke andar nahi bhejna.

      Pehle product create hoga.
      Uske baad parent story images upload karega.
    */

    const storyUploads = [];

    const cleanStorySections = (formData.storySections || []).map(
      (story, index) => {
        let image = story.image || "";

        if (story.image instanceof File) {
          storyUploads.push({
            index,
            file: story.image,
          });

          image = "";
        }

        return {
          ...story,
          image,
        };
      },
    );

    const submitData = {
      ...formData,

      storySections: cleanStorySections,
    };

    /*
      Parent ko:
      1. clean product data
      2. pending story images

      dono milenge.
    */

    await onSubmit?.(submitData, storyUploads);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* BASIC */}

      <BasicInformation
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      {/* PRODUCT INFORMATION */}

      <ProductInformation formData={formData} handleChange={handleChange} />

      {/* FEATURED IMAGE */}

      <MediaSection formData={formData} setFormData={setFormData} />

      {/* GALLERY */}

      <GallerySection
        formData={formData}
        setFormData={setFormData}
        productId={productId}
      />

      {/* VIDEO */}

      <VideoSection formData={formData} setFormData={setFormData} />

      {/* STORY */}

      <StorySection
        formData={formData}
        setFormData={setFormData}
        mode={mode}
        productId={productId}
      />

      {/* VARIANTS */}

      <VariantSection formData={formData} setFormData={setFormData} />

      {/* SAMPLE */}

      <SampleSection formData={formData} setFormData={setFormData} />

      {/* DOWNLOADS */}

      <DownloadSection formData={formData} setFormData={setFormData} />

      {/* SEO */}

      <SeoSection formData={formData} handleChange={handleChange} />

      {/* SETTINGS */}

      <SettingsSection
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
      />

      {/* =====================================
          ACTIONS
      ===================================== */}

      <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-lg">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/products")}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create Product"
              : "Update Product"}
        </Button>
      </div>
    </form>
  );
}
