import { createSlice } from "@reduxjs/toolkit";

import {
  fetchDashboardStats,
  fetchDashboardRecent,
} from "./dashboardThunk";

const initialState = {
  stats: {
    products: 0,
    collections: 0,
    categories: 0,
    tradeRequests: 0,
    journal: 0,
    sampleOrders: 0,
  },
  recentProducts: [],
  recentTradeRequests: [],
  recentJournal: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })

      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDashboardRecent.fulfilled, (state, action) => {
        state.recentProducts = action.payload.data.recentProducts;
        state.recentTradeRequests =
          action.payload.data.recentTradeRequests;
        state.recentJournal = action.payload.data.recentJournal;
      });
  },
});

export default dashboardSlice.reducer;