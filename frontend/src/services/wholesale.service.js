import api from "./axios";

const BASE_URL = "/admin/wholesale";

// Get All
export const getWholesaleInquiries = (params) => api.get(BASE_URL, { params });

// Get Single
export const getWholesaleInquiry = (id) => api.get(`${BASE_URL}/${id}`);

// Approve
export const approveWholesaleInquiry = (id) =>
  api.patch(`${BASE_URL}/${id}/approve`);

// Reject
export const rejectWholesaleInquiry = (id, payload) =>
  api.patch(`${BASE_URL}/${id}/reject`, payload);

// Update
export const updateWholesaleInquiry = (id, payload) =>
  api.patch(`${BASE_URL}/${id}`, payload);

// Delete
export const deleteWholesaleInquiry = (id) => api.delete(`${BASE_URL}/${id}`);

export const updateWholesaleStatus = (id, payload) => {
  if (payload?.status === "Approved") {
    return approveWholesaleInquiry(id);
  }

  if (payload?.status === "Rejected") {
    return rejectWholesaleInquiry(id, payload);
  }

  return updateWholesaleInquiry(id, payload);
};

export const updateWholesaleNote = (id, payload) =>
  updateWholesaleInquiry(id, payload);

export const uploadQuotation = (id, formData) =>
  api.patch(`${BASE_URL}/${id}`, formData);
