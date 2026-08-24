import axiosInstance from "../services/axios"

const BASE_URL = "/admin/admins";

export const getAdmins = (params) =>
  axiosInstance.get(BASE_URL, { params });

export const getSingleAdmin = (id) =>
  axiosInstance.get(`${BASE_URL}/${id}`);

export const createAdmin = (data) =>
  axiosInstance.post(BASE_URL, data);

export const updateAdmin = (id, data) =>
  axiosInstance.put(`${BASE_URL}/${id}`, data);

export const deleteAdmin = (id) =>
  axiosInstance.delete(`${BASE_URL}/${id}`);

export const toggleAdminStatus = (id) =>
  axiosInstance.patch(`${BASE_URL}/${id}/status`);

export const changePassword = (id, data) =>
  axiosInstance.patch(`${BASE_URL}/${id}/password`, data);

export const resetPassword = (id, data) =>
  axiosInstance.patch(`${BASE_URL}/${id}/reset-password`, data);

const adminService = {
  getAdmins,
  getSingleAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  changePassword,
  resetPassword,
};

export default adminService;