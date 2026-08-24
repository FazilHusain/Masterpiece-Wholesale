import api from "../axios";

export const createSampleOrder = (data) =>
  api.post("/api/sample-orders", data);

export const createSamplePayment = (orderId) =>
  api.post(`/api/sample-orders/${orderId}/payment`);

export const getMySampleOrders = () =>
  api.get("/api/sample-orders/my-orders");

export const getSampleOrder = (id) =>
  api.get(`/api/sample-orders/${id}`);

export const cancelSampleOrder = (id) =>
  api.delete(`/api/sample-orders/${id}`);