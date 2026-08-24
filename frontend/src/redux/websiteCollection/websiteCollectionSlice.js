import { createSlice } from "@reduxjs/toolkit";

import {
  fetchWebsiteCollections,
  fetchWebsiteCollection,
  fetchCollectionProducts,
} from "./websiteCollectionThunk";

const initialState = {
  // All collections
  collections: [],

  // Single collection
  collection: null,

  // Products belonging to collection
  collectionProducts: [],

  // Separate loading states
  collectionsLoading: false,
  collectionLoading: false,
  collectionProductsLoading: false,

  error: null,
};

const websiteCollectionSlice = createSlice({
  name: "websiteCollection",

  initialState,

  reducers: {
    clearWebsiteCollection(state) {
      state.collection = null;
      state.collectionProducts = [];
      state.collectionLoading = false;
      state.collectionProductsLoading = false;
      state.error = null;
    },

    clearCollectionProducts(state) {
      state.collectionProducts = [];
      state.collectionProductsLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // ALL COLLECTIONS
      // =====================================================

      .addCase(fetchWebsiteCollections.pending, (state) => {
        state.collectionsLoading = true;
        state.error = null;
      })

      .addCase(fetchWebsiteCollections.fulfilled, (state, action) => {
        state.collectionsLoading = false;

        state.collections = Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];
      })

      .addCase(fetchWebsiteCollections.rejected, (state, action) => {
        state.collectionsLoading = false;

        state.collections = [];

        state.error = action.payload || "Failed to fetch collections.";
      })

      // =====================================================
      // SINGLE COLLECTION
      // =====================================================

      .addCase(fetchWebsiteCollection.pending, (state) => {
        state.collectionLoading = true;
        state.error = null;

        // Important:
        // Remove old collection while new slug is loading
        state.collection = null;
      })

      .addCase(fetchWebsiteCollection.fulfilled, (state, action) => {
        state.collectionLoading = false;

        state.collection = action.payload?.data || null;
      })

      .addCase(fetchWebsiteCollection.rejected, (state, action) => {
        state.collectionLoading = false;

        state.collection = null;

        state.error = action.payload || "Failed to fetch collection.";
      })

      // =====================================================
      // COLLECTION PRODUCTS
      // =====================================================

      .addCase(fetchCollectionProducts.pending, (state) => {
        state.collectionProductsLoading = true;
        state.error = null;

        // Clear old products before loading new collection
        state.collectionProducts = [];
      })

      .addCase(fetchCollectionProducts.fulfilled, (state, action) => {
        state.collectionProductsLoading = false;

        const data = action.payload?.data;

        state.collectionProducts = Array.isArray(data)
          ? data
          : data?.products || [];
      })

      .addCase(fetchCollectionProducts.rejected, (state, action) => {
        state.collectionProductsLoading = false;

        state.collectionProducts = [];

        state.error = action.payload || "Failed to fetch collection products.";
      });
  },
});

export const { clearWebsiteCollection, clearCollectionProducts } =
  websiteCollectionSlice.actions;

export default websiteCollectionSlice.reducer;
