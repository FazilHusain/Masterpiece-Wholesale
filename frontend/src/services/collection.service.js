import api from "./axios";

const BASE_URL = "/admin/collections";

const buildFormData = (payload = {}) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    // -----------------------------
    // Images
    // -----------------------------
    if (
      key === "bannerImage" ||
      key === "thumbnailImage" ||
      key === "featuredImage"
    ) {
      const file = Array.isArray(value) ? value[0] : value;

      if (file instanceof File) {
        formData.append(key, file);
      }

      return;
    }

    // -----------------------------
    // Keywords
    // -----------------------------
    if (key === "keywords") {
      if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else {
        formData.append(key, value ?? "");
      }

      return;
    }

    // -----------------------------
    // Normal fields
    // -----------------------------
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};

// GET ALL COLLECTIONS
const getCollections = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

// GET SINGLE COLLECTION
const getCollection = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

// CREATE COLLECTION
const createCollection = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name || "");
  formData.append("shortDescription", data.shortDescription || "");
  formData.append("description", data.description || "");

  formData.append("storyTitle", data.storyTitle || "");
  formData.append("storyDescription", data.storyDescription || "");
  formData.append("storyVideo", data.storyVideo || "");

  formData.append("metaTitle", data.metaTitle || "");
  formData.append("metaDescription", data.metaDescription || "");
  formData.append("keywords", data.keywords || "");

  formData.append("isFeatured", String(data.isFeatured ?? false));
  formData.append("showOnHomepage", String(data.showOnHomepage ?? true));
  formData.append("isActive", String(data.isActive ?? true));
  formData.append("displayOrder", String(data.displayOrder ?? 0));

  if (data.bannerImage?.[0] instanceof File) {
    formData.append("bannerImage", data.bannerImage[0]);
  }

  if (data.thumbnailImage?.[0] instanceof File) {
    formData.append("thumbnailImage", data.thumbnailImage[0]);
  }

  if (data.featuredImage?.[0] instanceof File) {
    formData.append("featuredImage", data.featuredImage[0]);
  }

  const response = await api.post("/admin/collections", formData);

  return response.data;
};

// UPDATE COLLECTION
const updateCollection = async (id, data) => {
  const formData = new FormData();

  // Basic fields
  formData.append("name", data.name || "");
  formData.append("shortDescription", data.shortDescription || "");
  formData.append("description", data.description || "");

  formData.append("storyTitle", data.storyTitle || "");
  formData.append("storyDescription", data.storyDescription || "");
  formData.append("storyVideo", data.storyVideo || "");

  formData.append("metaTitle", data.metaTitle || "");
  formData.append("metaDescription", data.metaDescription || "");
  formData.append("keywords", data.keywords || "");

  formData.append("isFeatured", String(data.isFeatured ?? false));

  formData.append("showOnHomepage", String(data.showOnHomepage ?? true));

  formData.append("isActive", String(data.isActive ?? true));

  formData.append("displayOrder", String(data.displayOrder ?? 0));

  // Images
  if (data.bannerImage?.[0] instanceof File) {
    formData.append("bannerImage", data.bannerImage[0]);
  }

  if (data.thumbnailImage?.[0] instanceof File) {
    formData.append("thumbnailImage", data.thumbnailImage[0]);
  }

  if (data.featuredImage?.[0] instanceof File) {
    formData.append("featuredImage", data.featuredImage[0]);
  }

  const response = await api.put(`/admin/collections/${id}`, formData);

  return response.data;
};

// DELETE COLLECTION
const deleteCollection = async (id) => {
  const response = await api.delete(`${BASE_URL}/${id}`);

  return response.data;
};

const collectionService = {
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};

export default collectionService;
