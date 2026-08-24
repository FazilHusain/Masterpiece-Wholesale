import api from "./axios";

const BASE_URL = "/api/quick-orders";

const createQuickOrder = async (body) => {
  const { data } = await api.post(BASE_URL, body);
  return data;
};

const getMyQuickOrders = async () => {
  const { data } = await api.get(`${BASE_URL}/my-orders`);
  return data;
};

const getMyQuickOrder = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data;
};

export default {
  createQuickOrder,
  getMyQuickOrders,
  getMyQuickOrder,
};