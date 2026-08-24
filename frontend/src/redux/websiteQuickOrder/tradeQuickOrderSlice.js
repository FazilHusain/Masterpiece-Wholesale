import { createSlice } from "@reduxjs/toolkit";

import {
  createQuickOrder,
  fetchMyQuickOrder,
  fetchMyQuickOrders,
} from "./tradeQuickOrderThunk";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const tradeQuickOrderSlice = createSlice({
  name: "tradeQuickOrder",

  initialState,

  reducers: {
    clearTradeQuickOrder(state) {
      state.order = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createQuickOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createQuickOrder.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createQuickOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchMyQuickOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })

      .addCase(fetchMyQuickOrder.fulfilled, (state, action) => {
        state.order = action.payload.data;
      });
  },
});

export const {
  clearTradeQuickOrder,
} = tradeQuickOrderSlice.actions;

export default tradeQuickOrderSlice.reducer;