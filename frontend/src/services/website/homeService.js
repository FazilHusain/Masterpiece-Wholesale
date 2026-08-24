import api from "../axios";

const getHomePage = async () => {
  const { data } = await api.get("/api/home");

  return data;
};

export default {
  getHomePage,
};