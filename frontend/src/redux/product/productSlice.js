import { createSlice } from "@reduxjs/toolkit";

import {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadGalleryImages,
  deleteGalleryImage,
  reorderGallery,
  uploadStoryImage,
  uploadProductVideo,
} from "./productThunk";

const initialState = {
  products: [],
  product: null,

  loading: false,

  galleryLoading: false,

  videoLoading: false,

  storyLoading: false,

  error: null,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearProduct(state) {
      state.product = null;
      state.error = null;
    },

    clearProductError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // ==========================================
    // FETCH PRODUCTS
    // ==========================================

    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload?.data || [];
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    // ==========================================
    // FETCH SINGLE PRODUCT
    // ==========================================

    builder

      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.product = action.payload?.data || null;
      })

      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    // ==========================================
    // CREATE PRODUCT
    // ==========================================

    builder

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        const product = action.payload?.data;

        if (product) {
          state.products.unshift(product);

          state.product = product;
        }
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

    builder

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProduct = action.payload?.data;

        if (!updatedProduct) {
          return;
        }

        state.products = state.products.map((item) =>
          item._id === updatedProduct._id ? updatedProduct : item,
        );

        state.product = updatedProduct;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    // ==========================================
    // GALLERY UPLOAD
    // ==========================================

    builder

      .addCase(uploadGalleryImages.pending, (state) => {
        state.galleryLoading = true;

        state.error = null;
      })

      .addCase(uploadGalleryImages.fulfilled, (state, action) => {
        state.galleryLoading = false;

        const updatedProduct = action.payload?.data;

        if (!updatedProduct) {
          return;
        }

        state.product = updatedProduct;

        state.products = state.products.map((item) =>
          item._id === updatedProduct._id ? updatedProduct : item,
        );
      })

      .addCase(uploadGalleryImages.rejected, (state, action) => {
        state.galleryLoading = false;

        state.error = action.payload;
      });

    // ==========================================
    // DELETE GALLERY IMAGE
    // ==========================================

    builder.addCase(deleteGalleryImage.fulfilled, (state, action) => {
      const updatedProduct = action.payload?.data;

      if (!updatedProduct) {
        return;
      }

      state.product = updatedProduct;

      state.products = state.products.map((item) =>
        item._id === updatedProduct._id ? updatedProduct : item,
      );
    });

    // ==========================================
    // VIDEO UPLOAD
    // ==========================================

    builder

      .addCase(uploadProductVideo.pending, (state) => {
        state.videoLoading = true;
        state.error = null;
      })

      .addCase(uploadProductVideo.fulfilled, (state, action) => {
        state.videoLoading = false;

        const updatedProduct = action.payload?.data;

        if (!updatedProduct) {
          return;
        }

        state.product = updatedProduct;

        state.products = state.products.map((item) =>
          item._id === updatedProduct._id ? updatedProduct : item,
        );
      })

      .addCase(uploadProductVideo.rejected, (state, action) => {
        state.videoLoading = false;

        state.error = action.payload;
      });

    // ==========================================
    // STORY IMAGE UPLOAD
    // ==========================================

    builder

      .addCase(uploadStoryImage.pending, (state) => {
        state.storyLoading = true;
        state.error = null;
      })

      .addCase(uploadStoryImage.fulfilled, (state, action) => {
        state.storyLoading = false;

        const updatedProduct = action.payload?.data;

        if (!updatedProduct) {
          return;
        }

        state.product = updatedProduct;

        state.products = state.products.map((item) =>
          item._id === updatedProduct._id ? updatedProduct : item,
        );
      })

      .addCase(uploadStoryImage.rejected, (state, action) => {
        state.storyLoading = false;

        state.error = action.payload;
      });

    // ==========================================
    // REORDER GALLERY
    // ==========================================

    builder.addCase(reorderGallery.fulfilled, (state, action) => {
      const updatedProduct = action.payload?.data;

      if (!updatedProduct) {
        return;
      }

      state.product = updatedProduct;

      state.products = state.products.map((item) =>
        item._id === updatedProduct._id ? updatedProduct : item,
      );
    });

    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    builder

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (item) => item._id !== action.payload,
        );

        if (state.product?._id === action.payload) {
          state.product = null;
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { clearProduct, clearProductError } = productSlice.actions;

export default productSlice.reducer;
