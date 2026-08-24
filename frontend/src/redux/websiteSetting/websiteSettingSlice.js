import { createSlice } from "@reduxjs/toolkit";

import { fetchWebsiteSettings } from "./websiteSettingThunk";

const initialState = {
  settings: {},
  loading: false,
  error: null,
};

const websiteSettingSlice = createSlice({
  name: "websiteSetting",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchWebsiteSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWebsiteSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload.data;
      })

      .addCase(fetchWebsiteSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default websiteSettingSlice.reducer;
