import api from "./axios";

export const getContacts = (params) =>
  api.get("/admin/contact", {
    params,
  });

export const getSingleContact = (id) =>
  api.get(`/admin/contact/${id}`);

export const updateContactStatus = (id, data) =>
  api.patch(`/admin/contact/${id}/status`, data);

export const deleteContact = (id) =>
  api.delete(`/admin/contact/${id}`);

export const createContact = (data) =>
  api.post("/contact", data);