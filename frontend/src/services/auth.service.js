import api from "./axios";

export const getProfile = () => {
  return api.get("/admin/profile");
};

export const loginAdmin = (data) =>
  api.post("/admin/login", data);

export const forgotPassword = (data) =>
  api.post("/admin/forgot-password", data);

export const resetPassword = (data) =>
  api.post("/admin/reset-password", data);