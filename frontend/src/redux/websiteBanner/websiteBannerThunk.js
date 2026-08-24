import { createAsyncThunk } from "@reduxjs/toolkit";

import websiteBannerService from "../../services/website/websiteBannerService";

export const fetchWebsiteBanners = createAsyncThunk(
  "websiteBanner/fetchWebsiteBanners",

  async (_, thunkAPI) => {
    try {
      return await websiteBannerService.getBanners();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch website banners."
      );
    }
  }
);