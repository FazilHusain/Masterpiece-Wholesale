import { createAsyncThunk } from "@reduxjs/toolkit";

import productService from "../../services/product.service";

// =============================
// FETCH PRODUCTS
// =============================

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

// =============================
// FETCH SINGLE PRODUCT
// =============================

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

// =============================
// CREATE PRODUCT
// =============================

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, thunkAPI) => {
    try {
      return await productService.createProduct(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product",
      );
    }
  },
);

// =============================
// UPDATE PRODUCT
// =============================

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product",
      );
    }
  },
);

// =============================
// UPLOAD GALLERY IMAGES
// =============================

export const uploadGalleryImages = createAsyncThunk(
  "product/uploadGalleryImages",
  async ({ id, files }, thunkAPI) => {
    try {
      return await productService.uploadGalleryImages(id, files);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to upload gallery images",
      );
    }
  },
);


// =============================
// UPLOAD PRODUCT VIDEO
// =============================

export const uploadProductVideo = createAsyncThunk(
  "product/uploadProductVideo",
  async ({ id, file, title }, thunkAPI) => {
    try {
      return await productService.uploadProductVideo(
        id,
        file,
        title,
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to upload product video",
      );
    }
  },
);

// =============================
// UPLOAD STORY IMAGE
// =============================

export const uploadStoryImage = createAsyncThunk(
  "product/uploadStoryImage",
  async ({ id, storyIndex, file }, thunkAPI) => {
    try {
      return await productService.uploadStoryImage(id, storyIndex, file);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to upload story image",
      );
    }
  },
);

// =============================
// DELETE GALLERY IMAGE
// =============================

export const deleteGalleryImage = createAsyncThunk(
  "product/deleteGalleryImage",
  async ({ id, imageId }, { rejectWithValue }) => {
    try {
      return await productService.deleteGalleryImage(id, imageId);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete gallery image.",
      );
    }
  },
);

// =============================
// REORDER GALLERY
// =============================

export const reorderGallery = createAsyncThunk(
  "product/reorderGallery",
  async ({ productId, gallery }, thunkAPI) => {
    try {
      return await productService.reorderGallery(productId, gallery);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reorder gallery",
      );
    }
  },
);

// =============================
// DELETE PRODUCT
// =============================

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await productService.deleteProduct(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product",
      );
    }
  },
);
