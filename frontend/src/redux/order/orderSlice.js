import { createSlice } from "@reduxjs/toolkit";

import {
  fetchOrders,
  fetchOrder,
  updateOrderStatus,
  deleteOrder,
} from "./orderThunk";

const initialState = {
  orders: [],
  order: null,

  loading: false,

  error: null,
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrder(state) {
      state.order = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Orders

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Single

      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload.data;
      })

      // Status Update

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((item) =>
          item._id === action.payload.data._id
            ? action.payload.data
            : item
        );

        state.order = action.payload.data;
      })

      // Delete

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;