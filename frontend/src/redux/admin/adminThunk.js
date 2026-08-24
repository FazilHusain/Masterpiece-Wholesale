import { createAsyncThunk } from "@reduxjs/toolkit";

import adminService from "../../services/admin.service";

/* ================================
   Get Admins
================================ */

export const getAdmins = createAsyncThunk(
  "admin/getAdmins",
  async (params, thunkAPI) => {
    try {
      const response = await adminService.getAdmins(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================================
   Get Single Admin
================================ */

export const getSingleAdmin = createAsyncThunk(
  "admin/getSingleAdmin",
  async (id, thunkAPI) => {
    try {
      const response = await adminService.getSingleAdmin(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================================
   Create Admin
================================ */

export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (data, thunkAPI) => {
    try {
      const response = await adminService.createAdmin(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================================
   Update Admin
================================ */

export const updateAdmin = createAsyncThunk(
  "admin/updateAdmin",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await adminService.updateAdmin(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================================
   Delete Admin
================================ */

export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (id, thunkAPI) => {
    try {
      const response = await adminService.deleteAdmin(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================================
   Toggle Status
================================ */

export const toggleAdminStatus = createAsyncThunk(
  "admin/toggleStatus",
  async (id, thunkAPI) => {
    try {
      const response = await adminService.toggleAdminStatus(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================================
   Change Password
================================ */

export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await adminService.changePassword(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================================
   Reset Password
================================ */

export const resetPassword = createAsyncThunk(
  "admin/resetPassword",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await adminService.resetPassword(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);