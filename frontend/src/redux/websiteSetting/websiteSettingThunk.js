import { createAsyncThunk } from "@reduxjs/toolkit";

import websiteSettingService from "../../services/website/websiteSettingService";

export const fetchWebsiteSettings = createAsyncThunk(
  "websiteSetting/fetchWebsiteSettings",

  async (_, thunkAPI) => {
    try {
      return await websiteSettingService.getSettings();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch website settings."
      );
    }
  }
);