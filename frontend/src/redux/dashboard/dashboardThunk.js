import { createAsyncThunk } from "@reduxjs/toolkit";

import dashboardService from "../../services/dashboard.service";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",

  async (_, thunkAPI) => {
    try {
      return await dashboardService.getStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch dashboard stats."
      );
    }
  }
);

export const fetchDashboardRecent = createAsyncThunk(
  "dashboard/fetchDashboardRecent",

  async (_, thunkAPI) => {
    try {
      return await dashboardService.getRecent();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch dashboard recent activity."
      );
    }
  }
);