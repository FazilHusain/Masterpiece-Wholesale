import api from "../axios";

const BASE_URL = "/api/banner";

const getBanners = async () => {
  const { data } = await api.get(BASE_URL);

  return data;
};

export default {
  getBanners,
};