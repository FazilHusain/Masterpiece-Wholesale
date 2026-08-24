import express from "express";

import getWebsiteSettings from "../../controllers/settings/getWebsiteSettings.js";

const router = express.Router();

router.get("/", getWebsiteSettings);

export default router;