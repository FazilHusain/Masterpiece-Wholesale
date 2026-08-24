import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import * as wholesaleService from "../../services/wholesale.service";

export const fetchWholesaleInquiries = createAsyncThunk(
  "wholesale/fetchWholesaleInquiries",
  async (params, thunkAPI) => {
    try {
      const { data } =
        await wholesaleService.getWholesaleInquiries(params);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch wholesale inquiries.",
      );
    }
  },
);

export const fetchWholesaleInquiry = createAsyncThunk(
  "wholesale/fetchWholesaleInquiry",
  async (id, thunkAPI) => {
    try {
      const { data } =
        await wholesaleService.getWholesaleInquiry(id);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch inquiry.",
      );
    }
  },
);

export const updateWholesaleStatus = createAsyncThunk(
  "wholesale/updateWholesaleStatus",
  async ({ id, payload }, thunkAPI) => {
    try {
      const { data } =
        await wholesaleService.updateWholesaleStatus(
          id,
          payload,
        );

      toast.success(data.message);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update status.",
      );
    }
  },
);

export const updateWholesaleNote = createAsyncThunk(
  "wholesale/updateWholesaleNote",
  async ({ id, payload }, thunkAPI) => {
    try {
      const { data } =
        await wholesaleService.updateWholesaleNote(
          id,
          payload,
        );

      toast.success(data.message);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update note.",
      );
    }
  },
);

export const uploadWholesaleQuotation = createAsyncThunk(
  "wholesale/uploadQuotation",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } =
        await wholesaleService.uploadQuotation(
          id,
          formData,
        );

      toast.success(data.message);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to upload quotation.",
      );
    }
  },
);

export const deleteWholesaleInquiry = createAsyncThunk(
  "wholesale/deleteWholesaleInquiry",
  async (id, thunkAPI) => {
    try {
      await wholesaleService.deleteWholesaleInquiry(id);

      toast.success("Inquiry deleted.");

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete inquiry.",
      );
    }
  },
);