import express from "express";

import getCategories from "../../controllers/website/category/getCategories.js";
import getCategoryBySlug from "../../controllers/website/category/getCategoryBySlug.js";
import getCategoryProducts from "../../controllers/website/category/getCategoryProducts.js";

const router = express.Router();

router.get("/", getCategories);

router.get("/:slug/products", getCategoryProducts);

router.get("/:slug", getCategoryBySlug);

export default router;