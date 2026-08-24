import api from "./axios";

const BASE_URL = "/admin/orders";

const getOrders = async () => {
  const { data } = await api.get(BASE_URL);

  return data;
};

const getOrder = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);

  return data;
};

const updateOrderStatus = async (id, status) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}/status`,
    {
      status,
    }
  );

  return data;
};

const deleteOrder = async (id) => {
  const { data } = await api.delete(
    `${BASE_URL}/${id}`
  );

  return data;
};

const orderService = {
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
};

export default orderService;