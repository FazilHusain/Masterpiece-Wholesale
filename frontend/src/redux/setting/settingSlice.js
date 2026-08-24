import { createSlice } from "@reduxjs/toolkit";

import {
  fetchSettings,
  updateSettings,
  uploadSettingImage,
} from "./settingThunk";

const initialState = {
  settings: {},

  loading: false,

  error: null,
};

const settingSlice = createSlice({
  name: "setting",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;

        state.settings = action.payload.data;
      })

      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;

        state.settings = action.payload.data;
      })

      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(uploadSettingImage.fulfilled, (state, action) => {
        state.settings = action.payload.data;
      });
  },
});

export default settingSlice.reducer;