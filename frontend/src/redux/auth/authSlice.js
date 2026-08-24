import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAuthenticated: false,
  loading: false,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loginSuccess: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.authChecked = true;
    },

    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.authChecked = true;
    },

    authChecked: (state) => {
      state.authChecked = true;
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  logout,
  authChecked,
} = authSlice.actions;

export default authSlice.reducer;