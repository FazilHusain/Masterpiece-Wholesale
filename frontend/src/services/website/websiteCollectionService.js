import axios from "../axios";

const websiteCollectionService = {

    getCollections: async () => {
        const { data } = await axios.get("/api/collections");
        return data;
    },

    getCollection: async (slug) => {
        const { data } = await axios.get(
            `/api/collections/${slug}`
        );
        return data;
    },

    getCollectionProducts: async (slug) => {
        const { data } = await axios.get(
            `/api/collections/${slug}/products`
        );
        return data;
    },
};

export default websiteCollectionService;