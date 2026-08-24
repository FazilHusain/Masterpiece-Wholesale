import { createAsyncThunk } from "@reduxjs/toolkit";

import quickOrderService from "../../services/quickOrder.service";

export const fetchQuickOrders = createAsyncThunk(
  "quickOrder/fetchQuickOrders",
  quickOrderService.getQuickOrders,
);

export const fetchQuickOrder = createAsyncThunk(
  "quickOrder/fetchQuickOrder",
  quickOrderService.getQuickOrder,
);

export const createQuickOrder = createAsyncThunk(
  "quickOrder/createQuickOrder",
  quickOrderService.createQuickOrder,
);

export const updateQuickOrder = createAsyncThunk(
  "quickOrder/updateQuickOrder",
  ({ id, data }) => quickOrderService.updateQuickOrder(id, data),
);

export const updateQuickOrderStatus = createAsyncThunk(
  "quickOrder/updateQuickOrderStatus",
  ({ id, status }) => quickOrderService.updateQuickOrderStatus(id, status),
);

export const addQuickOrderAdminNote = createAsyncThunk(
  "quickOrder/addQuickOrderAdminNote",
  ({ id, adminNote }) => quickOrderService.addAdminNote(id, adminNote),
);

export const deleteQuickOrder = createAsyncThunk(
  "quickOrder/deleteQuickOrder",
  quickOrderService.deleteQuickOrder,
);
