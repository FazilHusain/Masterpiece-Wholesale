import api from "./axios";

const BASE_URL = "/admin/products";

// =============================
// GET ALL PRODUCTS
// =============================

const getProducts = async () => {
  const { data } = await api.get(BASE_URL);

  return data;
};

// =============================
// GET SINGLE PRODUCT
// =============================

const getProduct = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);

  return data;
};

// =============================
// BUILD PRODUCT FORM DATA
// =============================

const buildProductFormData = (payload = {}) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    // =============================
    // FEATURED IMAGE
    // =============================

    if (key === "featuredImage") {
      const file = Array.isArray(value) ? value[0] : value;

      if (file instanceof File) {
        formData.append("featuredImage", file);
      }

      return;
    }

    // =============================
    // GALLERY
    // =============================

    if (key === "gallery") {
      return;
    }

    // =============================
    // FILE ARRAYS
    // =============================

    if (Array.isArray(value) && value.some((item) => item instanceof File)) {
      return;
    }

    // =============================
    // TAGS
    // =============================

    if (key === "tags") {
      const tagArray = Array.isArray(value) ? value : [];

      formData.append("tags", tagArray.join(","));

      return;
    }

    // =============================
    // OBJECT / ARRAY
    // =============================

    if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));

      return;
    }

    // =============================
    // NORMAL VALUES
    // =============================

    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

// =============================
// CREATE PRODUCT
// =============================

const createProduct = async (payload) => {
  const formData = buildProductFormData(payload);

  const { data } = await api.post(BASE_URL, formData);

  return data;
};

// =============================
// UPDATE PRODUCT
// =============================

const updateProduct = async (id, payload) => {
  const formData = buildProductFormData(payload);

  const { data } = await api.put(`${BASE_URL}/${id}`, formData);

  return data;
};

// =============================
// UPLOAD GALLERY IMAGES
// =============================

const uploadGalleryImages = async (id, files = []) => {
  const formData = new FormData();

  files.forEach((file) => {
    if (file instanceof File) {
      formData.append("images", file);
    }
  });

  const { data } = await api.post(`${BASE_URL}/${id}/gallery`, formData);

  return data;
};


// =============================
// UPLOAD PRODUCT VIDEO
// =============================

const uploadProductVideo = async (productId, file, title = "") => {
  const formData = new FormData();

  if (file instanceof File) {
    formData.append("video", file);
  }

  if (title) {
    formData.append("title", title);
  }

  const { data } = await api.post(
    `${BASE_URL}/${productId}/video`,
    formData,
  );

  return data;
};

// =============================
// UPLOAD STORY IMAGE
// =============================

const uploadStoryImage = async (productId, storyIndex, file) => {
  const formData = new FormData();

  if (file instanceof File) {
    formData.append("image", file);
  }

  formData.append("storyIndex", String(storyIndex));

  const { data } = await api.post(
    `${BASE_URL}/${productId}/story-image`,
    formData,
  );

  return data;
};

// =============================
// DELETE GALLERY IMAGE
// =============================

const deleteGalleryImage = async (id, imageId) => {
  const { data } = await api.delete(
    `/admin/products/${id}/gallery/${imageId}`
  );

  return data;
};

// =============================
// REORDER GALLERY
// =============================

const reorderGallery = async (productId, gallery) => {
  const { data } = await api.put(`${BASE_URL}/${productId}/gallery/reorder`, {
    gallery,
  });

  return data;
};

// =============================
// DELETE PRODUCT
// =============================

const deleteProduct = async (id) => {
  const { data } = await api.delete(`${BASE_URL}/${id}`);

  return data;
};

// =============================
// EXPORT
// =============================

const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,

  uploadGalleryImages,
  deleteGalleryImage,
  reorderGallery,

  deleteProduct,
  uploadStoryImage,
  uploadProductVideo
};

export default productService;
