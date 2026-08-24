import axios from "../axios";

const searchService = {
  search: async (query) => {
    const { data } = await axios.get(
      "/api/products/search",
      {
        params: {
          query,
        },
      }
    );

    return data;
  },
};

export default searchService;