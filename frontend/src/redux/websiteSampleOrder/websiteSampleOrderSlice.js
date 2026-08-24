import { createSlice } from "@reduxjs/toolkit";

import {
  createWebsiteSampleOrder,
  fetchMyWebsiteSampleOrders,
  fetchWebsiteSampleOrder,
  cancelWebsiteSampleOrder,
  createWebsiteSamplePayment,
} from "./websiteSampleOrderThunk";

const initialState = {
  loading: false,
  success: false,
  error: null,

  sampleRequest: null,

  paymentLoading: false,
  paymentError: null,
  paymentData: null,

  orders: [],
  order: null,
};

const websiteSampleOrderSlice = createSlice({
  name: "websiteSampleOrder",

  initialState,

  reducers: {
    clearWebsiteSampleOrder(state) {
      state.loading = false;

      state.success = false;

      state.error = null;

      state.sampleRequest = null;

      state.orders = [];

      state.order = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE

      .addCase(createWebsiteSampleOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(createWebsiteSampleOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.error = null;

        state.sampleRequest = action.payload.data;
      })

      .addCase(createWebsiteSampleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // PAYMENT

      .addCase(createWebsiteSamplePayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
        state.paymentData = null;
      })

      .addCase(createWebsiteSamplePayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = null;
        state.paymentData = action.payload;
      })

      .addCase(createWebsiteSamplePayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      })

      // MY ORDERS

      .addCase(fetchMyWebsiteSampleOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMyWebsiteSampleOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.data || [];
      })

      .addCase(fetchMyWebsiteSampleOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DETAILS

      .addCase(fetchWebsiteSampleOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWebsiteSampleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.data;
      })

      .addCase(fetchWebsiteSampleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CANCEL

      .addCase(cancelWebsiteSampleOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelWebsiteSampleOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.filter(
          (item) => item._id !== action.meta.arg,
        );
      })

      .addCase(cancelWebsiteSampleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWebsiteSampleOrder } = websiteSampleOrderSlice.actions;

export default websiteSampleOrderSlice.reducer;
