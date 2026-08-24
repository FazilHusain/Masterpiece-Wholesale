import { createSlice } from "@reduxjs/toolkit";

import {
  getAdmins,
  getSingleAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  changePassword,
  resetPassword,
} from "./adminThunk";

const initialState = {
  admins: [],
  admin: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  loading: false,
  success: false,
  error: false,
  message: "",
};

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },

    clearSelectedAdmin: (state) => {
      state.admin = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===========================
      // Get Admins
      // ===========================

      .addCase(getAdmins.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.admins = action.payload.data.admins;

        state.pagination = action.payload.data.pagination;
      })

      .addCase(getAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ===========================
      // Get Single
      // ===========================

      .addCase(getSingleAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(getSingleAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.admin = action.payload.data;
      })

      .addCase(getSingleAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ===========================
      // Create
      // ===========================

      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.admins.unshift(action.payload.data);
      })

      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ===========================
      // Update
      // ===========================

      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.admins = state.admins.map((item) =>
          item._id === action.payload.data._id
            ? action.payload.data
            : item
        );

        state.admin = action.payload.data;
      })

      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ===========================
      // Delete
      // ===========================

      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.admins = state.admins.filter(
          (item) => item._id !== action.meta.arg
        );
      })

      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ===========================
      // Toggle Status
      // ===========================

      .addCase(toggleAdminStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(toggleAdminStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.admins = state.admins.map((item) =>
          item._id === action.payload.data._id
            ? {
                ...item,
                isActive: action.payload.data.isActive,
              }
            : item
        );
      })

      .addCase(toggleAdminStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ===========================
      // Change Password
      // ===========================

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ===========================
      // Reset Password
      // ===========================

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const {
  resetAdminState,
  clearSelectedAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;