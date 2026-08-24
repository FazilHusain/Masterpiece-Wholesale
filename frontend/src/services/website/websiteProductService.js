import api from "../axios";

const BASE_URL = "/api/products";

// ==========================================
// GET ALL PRODUCTS
// ==========================================

const getProducts = async () => {
  const { data } = await api.get(BASE_URL);

  return data;
};

// ==========================================
// SEARCH
// ==========================================

const searchProducts = async (query) => {
  const { data } = await api.get(`${BASE_URL}/search`, {
    params: {
      query,
    },
  });

  return data;
};

// ==========================================
// FEATURED
// ==========================================

const getFeaturedProducts = async () => {
  const { data } = await api.get(`${BASE_URL}/featured`);

  return data;
};

// ==========================================
// BEST SELLERS
// ==========================================

const getBestSellerProducts = async () => {
  const { data } = await api.get(`${BASE_URL}/bestsellers`);

  return data;
};

// ==========================================
// NEW ARRIVALS
// ==========================================

const getNewArrivalProducts = async () => {
  const { data } = await api.get(`${BASE_URL}/new-arrivals`);

  return data;
};

// ==========================================
// SINGLE PRODUCT
// ==========================================

const getProductBySlug = async (slug) => {
  const { data } = await api.get(`${BASE_URL}/${slug}`);

  console.log("🔥 SINGLE PRODUCT API RESPONSE =>", data);

  return data;
};

// ==========================================
// RELATED PRODUCTS
// ==========================================

const getRelatedProducts = async (slug) => {
  const { data } = await api.get(`${BASE_URL}/related/${slug}`);

  return data;
};

export {
  getProducts,
  searchProducts,
  getFeaturedProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
  getProductBySlug,
  getRelatedProducts,
};

const websiteProductService = {
  getProducts,
  searchProducts,
  getFeaturedProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
  getProductBySlug,
  getRelatedProducts,
};

export default websiteProductService;
