import express from "express";

import getWebsiteBanners from "../../controllers/banner/getWebsiteBanners.js";

const router = express.Router();

router.get("/", getWebsiteBanners);

export default router;