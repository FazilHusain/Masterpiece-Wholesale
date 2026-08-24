import api from "./axios";

const BASE_URL = "/admin/categories";

// =============================
// BUILD FORM DATA
// =============================

const buildFormData = (payload = {}) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    // =============================
    // IMAGES
    // =============================

    if (
      key === "image" ||
      key === "bannerImage"
    ) {
      const file = Array.isArray(value)
        ? value[0]
        : value;

      if (file instanceof File) {
        formData.append(key, file);
      }

      return;
    }

    // =============================
    // NORMAL FIELDS
    // =============================

    if (
      value !== undefined &&
      value !== null
    ) {
      formData.append(
        key,
        typeof value === "boolean"
          ? String(value)
          : value
      );
    }
  });

  return formData;
};

// =============================
// GET ALL CATEGORIES
// =============================

const getCategories = async () => {
  const response = await api.get(BASE_URL);

  return response.data;
};

// =============================
// GET SINGLE CATEGORY
// =============================

const getCategory = async (id) => {
  const response = await api.get(
    `${BASE_URL}/${id}`
  );

  return response.data;
};

// =============================
// CREATE CATEGORY
// =============================

const createCategory = async (payload) => {
  const formData = buildFormData(payload);

  const response = await api.post(
    BASE_URL,
    formData
  );

  return response.data;
};

// =============================
// UPDATE CATEGORY
// =============================

const updateCategory = async (id, payload) => {
  const formData = buildFormData(payload);

  const response = await api.put(
    `${BASE_URL}/${id}`,
    formData
  );

  return response.data;
};

// =============================
// DELETE CATEGORY
// =============================

const deleteCategory = async (id) => {
  const response = await api.delete(
    `${BASE_URL}/${id}`
  );

  return response.data;
};

export default {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};