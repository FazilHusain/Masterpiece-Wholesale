import { createSlice } from "@reduxjs/toolkit";

import {
  fetchBanners,
  fetchBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  uploadBannerDesktop,
  uploadBannerMobile,
} from "./bannerThunk";

const initialState = {
  banners: [],
  banner: null,

  pagination: null,

  loading: false,

  error: null,
};

const bannerSlice = createSlice({
  name: "banner",

  initialState,

  reducers: {
    clearBanner(state) {
      state.banner = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchBanners.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchBanners.fulfilled,
        (state, action) => {
          state.loading = false;

          state.banners =
            action.payload.data.banners;

          state.pagination =
            action.payload.data.pagination;
        }
      )

      .addCase(
        fetchBanner.fulfilled,
        (state, action) => {
          state.banner =
            action.payload.data;
        }
      )

      .addCase(
        createBanner.fulfilled,
        (state, action) => {
          state.banners.unshift(
            action.payload.data
          );
        }
      )

      .addCase(
        updateBanner.fulfilled,
        (state, action) => {
          state.banner =
            action.payload.data;

          state.banners =
            state.banners.map((item) =>
              item._id ===
              action.payload.data._id
                ? action.payload.data
                : item
            );
        }
      )

      .addCase(
        deleteBanner.fulfilled,
        (state, action) => {
          state.banners =
            state.banners.filter(
              (item) =>
                item._id !==
                action.meta.arg
            );
        }
      )

      .addCase(
        uploadBannerDesktop.fulfilled,
        (state, action) => {
          state.banner =
            action.payload.data;
        }
      )

      .addCase(
        uploadBannerMobile.fulfilled,
        (state, action) => {
          state.banner =
            action.payload.data;
        }
      );
  },
});

export const {
  clearBanner,
} = bannerSlice.actions;

export default bannerSlice.reducer;