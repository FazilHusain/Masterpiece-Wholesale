import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCollections,
  fetchCollection,
  createCollection,
  updateCollection,
  deleteCollection,
} from "./collectionThunk";

const initialState = {
  collections: [],
  collection: null,

  loading: false,

  error: null,
};

const collectionSlice = createSlice({
  name: "collection",

  initialState,

  reducers: {
    clearCollection(state) {
      state.collection = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch List

      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload.data;
      })

      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single

      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.collection = action.payload.data;
      })

      // Create

      .addCase(createCollection.fulfilled, (state, action) => {
        state.collections.unshift(action.payload.data);
      })

      // Update

      .addCase(updateCollection.fulfilled, (state, action) => {
        state.collections = state.collections.map((item) =>
          item._id === action.payload.data._id
            ? action.payload.data
            : item
        );
      })

      // Delete

      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearCollection } = collectionSlice.actions;

export default collectionSlice.reducer;