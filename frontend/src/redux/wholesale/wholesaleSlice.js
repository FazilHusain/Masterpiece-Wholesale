import { createSlice } from "@reduxjs/toolkit";

import {
  fetchWholesaleInquiries,
  fetchWholesaleInquiry,
  updateWholesaleStatus,
  updateWholesaleNote,
  uploadWholesaleQuotation,
  deleteWholesaleInquiry,
} from "./wholesaleThunk";

const initialState = {
  inquiries: [],
  inquiry: null,

  loading: false,
  detailsLoading: false,

  pagination: {},

  error: null,
};

const wholesaleSlice = createSlice({
  name: "wholesale",

  initialState,

  reducers: {
    clearWholesaleDetails(state) {
      state.inquiry = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===========================
         GET ALL
      =========================== */

      .addCase(fetchWholesaleInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWholesaleInquiries.fulfilled, (state, action) => {
        state.loading = false;

        state.inquiries =
          action.payload.applications || [];

        state.pagination =
          action.payload.pagination || {};

        state.error = null;
      })

      .addCase(fetchWholesaleInquiries.rejected, (state, action) => {
        state.loading = false;

        state.inquiries = [];

        state.error = action.payload;
      })

      /* ===========================
         GET SINGLE
      =========================== */

      .addCase(fetchWholesaleInquiry.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })

      .addCase(fetchWholesaleInquiry.fulfilled, (state, action) => {
        state.detailsLoading = false;

        state.inquiry = action.payload;
      })

      .addCase(fetchWholesaleInquiry.rejected, (state, action) => {
        state.detailsLoading = false;

        state.error = action.payload;
      })

      /* ===========================
         STATUS
      =========================== */

      .addCase(updateWholesaleStatus.fulfilled, (state, action) => {
        state.inquiry = action.payload;
      })

      /* ===========================
         NOTE
      =========================== */

      .addCase(updateWholesaleNote.fulfilled, (state, action) => {
        state.inquiry = action.payload;
      })

      /* ===========================
         QUOTATION
      =========================== */

      .addCase(uploadWholesaleQuotation.fulfilled, (state, action) => {
        state.inquiry = action.payload;
      })

      /* ===========================
         DELETE
      =========================== */

      .addCase(deleteWholesaleInquiry.fulfilled, (state, action) => {
        state.inquiries = state.inquiries.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearWholesaleDetails } = wholesaleSlice.actions;

export default wholesaleSlice.reducer;