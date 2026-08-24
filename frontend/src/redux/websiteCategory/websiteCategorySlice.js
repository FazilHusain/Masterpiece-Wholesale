import { createSlice } from "@reduxjs/toolkit";

import {
  fetchWebsiteCategories,
  fetchWebsiteCategory,
  fetchCategoryProducts,
} from "./websiteCategoryThunk";

const initialState = {
  categories: [],
  category: null,
  categoryProducts: [],

  loading: false,
  error: null,
};

const websiteCategorySlice = createSlice({
  name: "websiteCategory",

  initialState,

  reducers: {
    clearWebsiteCategory: (state) => {
      state.category = null;
      state.categoryProducts = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // ALL CATEGORIES
      // =====================================

      .addCase(fetchWebsiteCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWebsiteCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.data || [];
      })

      .addCase(fetchWebsiteCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      })

      // =====================================
      // SINGLE CATEGORY
      // =====================================

      .addCase(fetchWebsiteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.category = null;
      })

      .addCase(fetchWebsiteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload?.data || null;
      })

      .addCase(fetchWebsiteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch category";
      })

      // =====================================
      // CATEGORY PRODUCTS
      // =====================================

      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload?.data;

        state.categoryProducts = Array.isArray(data)
          ? data
          : data?.products || [];
      })

      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch category products";
      });
  },
});

export const { clearWebsiteCategory } = websiteCategorySlice.actions;

export default websiteCategorySlice.reducer;
