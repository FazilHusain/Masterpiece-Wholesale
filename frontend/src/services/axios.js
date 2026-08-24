import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// TEMP DEBUG
api.interceptors.request.use((config) => {
  console.log("================================");
  console.log("REQUEST URL =>", config.url);

  const tradeToken = localStorage.getItem("tradeToken");
  const adminToken = localStorage.getItem("adminToken");

  console.log("TRADE TOKEN =>", tradeToken);
  console.log("ADMIN TOKEN =>", adminToken);

  // Admin APIs
  if (config.url?.startsWith("/admin")) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  // Trade APIs
  if (
    config.url?.startsWith("/api/quick-orders") ||
    config.url?.startsWith("/api/sample-orders")
  ) {
    config.headers.Authorization = `Bearer ${tradeToken}`;
  }

  return config;
});

export default api;