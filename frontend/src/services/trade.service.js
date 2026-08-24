import api from "./axios";

const BASE_URL = "/admin/trade";

const getTradeRequests = async () => {
  const { data } = await api.get(BASE_URL);

  return data;
};

const getTradeRequest = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);

  return data;
};

const approveTradeRequest = async (id) => {
  const { data } = await api.patch(`${BASE_URL}/${id}/approve`);

  return data;
};

const rejectTradeRequest = async (id) => {
  const { data } = await api.patch(`${BASE_URL}/${id}/reject`);

  return data;
};

// Login
export const tradeLogin = async (payload) => {
  return api.post("/api/users/trade/login", payload);
};

// Logout
export const tradeLogout = () => {
  localStorage.removeItem("tradeToken");
  localStorage.removeItem("tradeUser");

  window.location.href = "/trade-login";
};

// Token
export const getTradeToken = () => {
  return localStorage.getItem("tradeToken");
};

// User
export const getTradeUser = () => {
  const user = localStorage.getItem("tradeUser");
  return user ? JSON.parse(user) : null;
};

export const isTradeLoggedIn = () => {
  return !!localStorage.getItem("tradeToken");
};

export const tradeSetPassword = async (payload) => {
  return api.post("/api/users/trade/set-password", payload);
};

export const tradeForgotPassword = async (email) => {
  return api.post("/api/users/trade/forgot-password", {
    email,
  });
};

export const tradeResetPassword = async (payload) => {
  return api.post("/api/users/trade/reset-password", payload);
};

const tradeService = {
  getTradeRequests,
  getTradeRequest,
  approveTradeRequest,
  rejectTradeRequest,
  isTradeLoggedIn,
  tradeSetPassword,
  tradeForgotPassword,
  tradeResetPassword
};

export default tradeService;
