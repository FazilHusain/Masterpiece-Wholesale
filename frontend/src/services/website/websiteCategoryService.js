import axios from "../axios";

const categoryService = {
  // All categories
  getCategories: async () => {
    const { data } = await axios.get("/api/category");
    return data;
  },

  // Single category
  getCategory: async (slug) => {
    const { data } = await axios.get(
      `/api/category/${slug}`
    );

    return data;
  },

  // Category products
  getCategoryProducts: async (slug) => {
    const { data } = await axios.get(
      `/api/category/${slug}/products`
    );

    return data;
  },
};

export default categoryService;