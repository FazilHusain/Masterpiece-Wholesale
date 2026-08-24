import { createAsyncThunk } from "@reduxjs/toolkit";

import sampleOrderService from "../../services/sampleOrder.service";

export const fetchSampleOrders = createAsyncThunk(
  "sampleOrder/fetchSampleOrders",
  sampleOrderService.getSampleOrders,
);

export const fetchSampleOrder = createAsyncThunk(
  "sampleOrder/fetchSampleOrder",
  sampleOrderService.getSampleOrder,
);

export const createSampleOrder = createAsyncThunk(
  "sampleOrder/createSampleOrder",
  sampleOrderService.createSampleOrder,
);

export const updateSampleOrder = createAsyncThunk(
  "sampleOrder/updateSampleOrder",
  ({ id, data }) => sampleOrderService.updateSampleOrder(id, data),
);

export const updateSampleStatus = createAsyncThunk(
  "sampleOrder/updateSampleStatus",
  ({ id, status }) => sampleOrderService.updateSampleStatus(id, status),
);

export const addAdminNote = createAsyncThunk(
  "sampleOrder/addAdminNote",
  ({ id, adminNote }) => sampleOrderService.addAdminNote(id, adminNote),
);

export const deleteSampleOrder = createAsyncThunk(
  "sampleOrder/deleteSampleOrder",
  sampleOrderService.deleteSampleOrder,
);
