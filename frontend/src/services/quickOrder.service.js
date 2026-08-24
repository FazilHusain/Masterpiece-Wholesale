import api from "./axios";

const BASE_URL = "/admin/quick-orders";

const getQuickOrders = async (params) => {
  const { data } = await api.get(BASE_URL, {
    params,
  });

  return data;
};

const getQuickOrder = async (id) => {
  const { data } = await api.get(
    `${BASE_URL}/${id}`
  );

  return data;
};

const createQuickOrder = async (body) => {
  const { data } = await api.post(
    "/api/quick-orders",
    body
  );

  return data;
};

const updateQuickOrder = async (
  id,
  body
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}`,
    body
  );

  return data;
};

const updateQuickOrderStatus = async (
  id,
  status
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}/status`,
    { status }
  );

  return data;
};

const addAdminNote = async (
  id,
  adminNote
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}/admin-note`,
    { adminNote }
  );

  return data;
};

const deleteQuickOrder = async (
  id
) => {
  const { data } = await api.delete(
    `${BASE_URL}/${id}`
  );

  return data;
};

export default {
  getQuickOrders,
  getQuickOrder,
  createQuickOrder,
  updateQuickOrder,
  updateQuickOrderStatus,
  addAdminNote,
  deleteQuickOrder,
};