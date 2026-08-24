import { createSlice } from "@reduxjs/toolkit";

import {
  fetchQuickOrders,
  fetchQuickOrder,
  updateQuickOrder,
  updateQuickOrderStatus,
  addQuickOrderAdminNote,
  deleteQuickOrder,
} from "./quickOrderThunk";

const initialState = {
  orders: [],
  order: null,

  pagination: {
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  },

  counts: {
    total: 0,
    pending: 0,
    confirmed: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
  },

  loading: false,
  error: null,
};

const quickOrderSlice = createSlice({
  name: "quickOrder",

  initialState,

  reducers: {
    clearQuickOrder(state) {
      state.order = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ============================
      // FETCH ALL QUICK ORDERS
      // ============================

      .addCase(fetchQuickOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchQuickOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.data.orders;
        state.counts = action.payload.data.counts;

        state.pagination = {
          page: action.payload.data.page,
          limit: action.payload.data.limit,
          total: action.payload.data.total,
          totalPages: action.payload.data.totalPages,
        };
      })

      .addCase(fetchQuickOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ============================
      // FETCH SINGLE QUICK ORDER
      // ============================

      .addCase(fetchQuickOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchQuickOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })

      .addCase(fetchQuickOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ============================
      // UPDATE QUICK ORDER
      // ============================

      .addCase(updateQuickOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateQuickOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })

      .addCase(updateQuickOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ============================
      // UPDATE STATUS
      // ============================

      .addCase(updateQuickOrderStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateQuickOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })

      .addCase(updateQuickOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ============================
      // ADMIN NOTE
      // ============================

      .addCase(addQuickOrderAdminNote.pending, (state) => {
        state.loading = true;
      })

      .addCase(addQuickOrderAdminNote.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })

      .addCase(addQuickOrderAdminNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ============================
      // DELETE
      // ============================

      .addCase(deleteQuickOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteQuickOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.filter(
          (item) => item._id !== action.meta.arg
        );
      })

      .addCase(deleteQuickOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearQuickOrder } = quickOrderSlice.actions;

export default quickOrderSlice.reducer;