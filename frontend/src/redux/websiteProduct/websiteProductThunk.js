import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductBySlug,
  getRelatedProducts,
  getFeaturedProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
} from "../../services/website/websiteProductService";

// ==========================================
// GET ALL PRODUCTS
// ==========================================

export const fetchWebsiteProducts = createAsyncThunk(
  "websiteProduct/fetchWebsiteProducts",
  async (_, thunkAPI) => {
    try {
      const response = await getProducts();

      console.log("PRODUCT SERVICE RESPONSE =>", response);

      return response?.data || response || [];
    } catch (err) {
      console.error("PRODUCT API ERROR =>", err);

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch products",
      );
    }
  },
);

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

export const fetchWebsiteProduct = createAsyncThunk(
  "websiteProduct/fetchWebsiteProduct",
  async (slug, thunkAPI) => {
    try {
      const response = await getProductBySlug(slug);

      console.log("🔥 SINGLE PRODUCT THUNK RESPONSE =>", response);
      console.log("🔥 SINGLE PRODUCT DATA =>", response?.data);

      return response?.data || response || null;
    } catch (err) {
      console.error("❌ SINGLE PRODUCT ERROR =>", err);

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch product",
      );
    }
  },
);

// ==========================================
// RELATED PRODUCTS
// ==========================================

export const fetchRelatedProducts = createAsyncThunk(
  "websiteProduct/fetchRelatedProducts",
  async (slug, thunkAPI) => {
    try {
      const response = await getRelatedProducts(slug);

      return response?.data || response || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch related products",
      );
    }
  },
);

// ==========================================
// FEATURED PRODUCTS
// ==========================================

export const fetchFeaturedProducts = createAsyncThunk(
  "websiteProduct/fetchFeaturedProducts",
  async (_, thunkAPI) => {
    try {
      const response = await getFeaturedProducts();

      return response?.data || response || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch featured products",
      );
    }
  },
);

// ==========================================
// BEST SELLER PRODUCTS
// ==========================================

export const fetchBestSellerProducts = createAsyncThunk(
  "websiteProduct/fetchBestSellerProducts",
  async (_, thunkAPI) => {
    try {
      const response = await getBestSellerProducts();

      return response?.data || response || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch best seller products",
      );
    }
  },
);

// ==========================================
// NEW ARRIVAL PRODUCTS
// ==========================================

export const fetchNewArrivalProducts = createAsyncThunk(
  "websiteProduct/fetchNewArrivalProducts",
  async (_, thunkAPI) => {
    try {
      const response = await getNewArrivalProducts();

      return response?.data || response || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch new arrival products",
      );
    }
  },
);
