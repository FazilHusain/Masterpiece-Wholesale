import api from "../axios";

const BASE_URL = "/api/settings";

const getSettings = async () => {
  const { data } = await api.get(BASE_URL);

  console.log(data);

  return data;
};

export default {
  getSettings,
};