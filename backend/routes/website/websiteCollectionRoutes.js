import express from "express";

import getCollections from "../../controllers/website/collection/getCollections.js";
import getCollectionBySlug from "../../controllers/website/collection/getCollectionBySlug.js";
import getCollectionProducts from "../../controllers/website/collection/getCollectionProducts.js";

const router = express.Router();

router.get("/", getCollections);

router.get("/:slug/products", getCollectionProducts);

router.get("/:slug", getCollectionBySlug);

export default router;