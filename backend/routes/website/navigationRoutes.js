import express from "express";

import getNavigation from "../../controllers/website/navigation/getNavigation.js";

const router = express.Router();

router.get("/", getNavigation);

export default router;