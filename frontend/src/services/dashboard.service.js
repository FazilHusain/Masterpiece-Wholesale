
import api from "./axios";

const BASE_URL = "/admin/dashboard";

const getStats = async () => {
  const { data } = await api.get(`${BASE_URL}/stats`);

  return data;
};

const getRecent = async () => {
  const { data } = await api.get(`${BASE_URL}/recent`);

  return data;
};

export default {
  getStats,
  getRecent,
};