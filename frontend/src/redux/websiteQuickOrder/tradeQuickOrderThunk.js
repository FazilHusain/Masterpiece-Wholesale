import { createAsyncThunk } from "@reduxjs/toolkit";

import websiteQuickOrderService from "../../services/websiteQuickOrder.service";

export const createQuickOrder =
  createAsyncThunk(
    "tradeQuickOrder/createQuickOrder",
    websiteQuickOrderService.createQuickOrder
  );

export const fetchMyQuickOrders =
  createAsyncThunk(
    "tradeQuickOrder/fetchMyQuickOrders",
    websiteQuickOrderService.getMyQuickOrders
  );

export const fetchMyQuickOrder =
  createAsyncThunk(
    "tradeQuickOrder/fetchMyQuickOrder",
    websiteQuickOrderService.getMyQuickOrder
  );

