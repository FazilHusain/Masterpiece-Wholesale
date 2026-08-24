import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoryThunk";

const initialState = {
  categories: [],
  category: null,

  loading: false,

  error: null,

  drawerOpen: false,

  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    openDrawer(state, action) {
      state.drawerOpen = true;
      state.selectedCategory = action.payload || null;
    },

    closeDrawer(state) {
      state.drawerOpen = false;
      state.selectedCategory = null;
    },

    clearCategory(state) {
      state.category = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Category

      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
      })

      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload.data);
        state.drawerOpen = false;
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.map((item) =>
          item._id === action.payload.data._id
            ? action.payload.data
            : item
        );

        state.drawerOpen = false;
      })

      // Delete

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const {
  openDrawer,
  closeDrawer,
  clearCategory,
} = categorySlice.actions;

export default categorySlice.reducer;