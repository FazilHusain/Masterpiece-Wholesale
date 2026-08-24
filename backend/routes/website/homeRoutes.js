import express from "express";

import getHomePage from "../../controllers/website/home/getHomePage.js";

const router = express.Router();

router.get("/", getHomePage);

export default router;