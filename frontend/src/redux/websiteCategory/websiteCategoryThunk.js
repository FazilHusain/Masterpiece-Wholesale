import { createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/website/websiteCategoryService";


// ===============================
// FETCH ALL WEBSITE CATEGORIES
// ===============================

export const fetchWebsiteCategories = createAsyncThunk(
  "websiteCategory/fetchWebsiteCategories",

  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch categories"
      );
    }
  }
);


// ===============================
// FETCH SINGLE CATEGORY
// ===============================

export const fetchWebsiteCategory = createAsyncThunk(
  "websiteCategory/fetchWebsiteCategory",

  async (slug, thunkAPI) => {
    try {
      return await categoryService.getCategory(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch category"
      );
    }
  }
);


// ===============================
// FETCH CATEGORY PRODUCTS
// ===============================

export const fetchCategoryProducts = createAsyncThunk(
  "websiteCategory/fetchCategoryProducts",

  async (slug, thunkAPI) => {
    try {
      return await categoryService.getCategoryProducts(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch category products"
      );
    }
  }
);