import { createAsyncThunk } from "@reduxjs/toolkit";

import settingService from "../../services/setting.service";

export const fetchSettings = createAsyncThunk(
  "setting/fetchSettings",
  async (_, thunkAPI) => {
    try {
      return await settingService.getSettings();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch settings."
      );
    }
  }
);

export const updateSettings = createAsyncThunk(
  "setting/updateSettings",
  async (payload, thunkAPI) => {
    try {
      return await settingService.updateSettings(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update settings."
      );
    }
  }
);

export const uploadSettingImage = createAsyncThunk(
  "setting/uploadSettingImage",
  async ({ type, image }, thunkAPI) => {
    try {
      return await settingService.uploadImage(type, image);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to upload image."
      );
    }
  }
);