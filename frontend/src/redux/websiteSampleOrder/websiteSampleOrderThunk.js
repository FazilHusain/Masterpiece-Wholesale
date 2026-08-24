import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createSampleOrder,
  getMySampleOrders,
  getSampleOrder,
  createSamplePayment,
  cancelSampleOrder,
} from "../../services/website/websiteSampleOrderService";

/* =========================
   CREATE SAMPLE ORDER
========================= */

export const createWebsiteSampleOrder = createAsyncThunk(
  "websiteSampleOrder/create",
  async (data, thunkAPI) => {
    try {
      const response = await createSampleOrder(data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to submit sample request.",
        },
      );
    }
  },
);

/* =========================
   CREATE SAMPLE PAYMENT
========================= */

export const createWebsiteSamplePayment = createAsyncThunk(
  "websiteSampleOrder/createPayment",
  async (orderId, thunkAPI) => {
    try {
      const response = await createSamplePayment(orderId);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to initialize sample payment.",
        },
      );
    }
  },
);

/* =========================
   MY SAMPLE ORDERS
========================= */

export const fetchMyWebsiteSampleOrders = createAsyncThunk(
  "websiteSampleOrder/myOrders",
  async (_, thunkAPI) => {
    try {
      const response = await getMySampleOrders();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch sample orders.",
        },
      );
    }
  },
);

/* =========================
   SAMPLE ORDER DETAILS
========================= */

export const fetchWebsiteSampleOrder = createAsyncThunk(
  "websiteSampleOrder/details",
  async (id, thunkAPI) => {
    try {
      const response = await getSampleOrder(id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch sample order.",
        },
      );
    }
  },
);

/* =========================
   CANCEL SAMPLE ORDER
========================= */

export const cancelWebsiteSampleOrder = createAsyncThunk(
  "websiteSampleOrder/cancel",
  async (id, thunkAPI) => {
    try {
      const response = await cancelSampleOrder(id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to cancel sample order.",
        },
      );
    }
  },
);