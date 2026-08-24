import { createSlice } from "@reduxjs/toolkit";

import { fetchWebsiteBanners } from "./websiteBannerThunk";

const initialState = {
  banners: [],
  loading: false,
  error: null,
};

const websiteBannerSlice = createSlice({
  name: "websiteBanner",

  initialState,

  reducers: {
    clearWebsiteBanners(state) {
      state.banners = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchWebsiteBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWebsiteBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })

      .addCase(fetchWebsiteBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearWebsiteBanners,
} = websiteBannerSlice.actions;

export default websiteBannerSlice.reducer;