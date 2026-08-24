import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWebsiteProducts,
  fetchWebsiteProduct,
  fetchRelatedProducts,
  fetchFeaturedProducts,
  fetchBestSellerProducts,
  fetchNewArrivalProducts,
} from "./websiteProductThunk";

const initialState = {
  products: [],
  product: null,
  relatedProducts: [],
  featuredProducts: [],
  bestSellerProducts: [],
  newArrivalProducts: [],
  loading: false,
  featuredLoading: false,
  bestSellerLoading: false,
  newArrivalLoading: false,
  error: null,
};

const websiteProductSlice = createSlice({
  name: "websiteProduct",

  initialState,

  reducers: {
    clearWebsiteProduct(state) {
      state.product = null;
      state.relatedProducts = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchWebsiteProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWebsiteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchWebsiteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchWebsiteProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWebsiteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(fetchWebsiteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
      })

      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.featuredLoading = true;
      })

      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredLoading = false;
        state.featuredProducts = action.payload;
      })

      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.featuredLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchBestSellerProducts.pending, (state) => {
        state.bestSellerLoading = true;
      })

      .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
        state.bestSellerLoading = false;
        state.bestSellerProducts = action.payload;
      })

      .addCase(fetchBestSellerProducts.rejected, (state, action) => {
        state.bestSellerLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchNewArrivalProducts.pending, (state) => {
        state.newArrivalLoading = true;
      })

      .addCase(fetchNewArrivalProducts.fulfilled, (state, action) => {
        state.newArrivalLoading = false;
        state.newArrivalProducts = action.payload;
      })

      .addCase(fetchNewArrivalProducts.rejected, (state, action) => {
        state.newArrivalLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWebsiteProduct } =
  websiteProductSlice.actions;

export default websiteProductSlice.reducer;