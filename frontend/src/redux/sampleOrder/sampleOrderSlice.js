import { createSlice } from "@reduxjs/toolkit";

import {
  fetchSampleOrders,
  fetchSampleOrder,
  updateSampleOrder,
  updateSampleStatus,
  addAdminNote,
  deleteSampleOrder,
} from "./sampleOrderThunk";

const initialState = {
  orders: [],
  order: null,
  pagination: null,

  loading: false,
  error: null,
};

const sampleOrderSlice =
  createSlice({
    name: "sampleOrder",

    initialState,

    reducers: {
      clearSampleOrder(state) {
        state.order = null;
      },
    },

    extraReducers: (builder) => {
      builder

        .addCase(
          fetchSampleOrders.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          fetchSampleOrders.fulfilled,
          (state, action) => {
            state.loading = false;

            state.orders =
              action.payload.data.orders;

            state.pagination =
              action.payload.data.pagination;
          }
        )

        .addCase(
          fetchSampleOrder.fulfilled,
          (state, action) => {
            state.order =
              action.payload.data;
          }
        )

        .addCase(
          updateSampleOrder.fulfilled,
          (state, action) => {
            state.order =
              action.payload.data;
          }
        )

        .addCase(
          updateSampleStatus.fulfilled,
          (state, action) => {
            state.order =
              action.payload.data;
          }
        )

        .addCase(
          addAdminNote.fulfilled,
          (state, action) => {
            state.order =
              action.payload.data;
          }
        )

        .addCase(
          deleteSampleOrder.fulfilled,
          (state, action) => {
            state.orders =
              state.orders.filter(
                (item) =>
                  item._id !==
                  action.meta.arg
              );
          }
        );
    },
  });

export const {
  clearSampleOrder,
} = sampleOrderSlice.actions;

export default sampleOrderSlice.reducer;