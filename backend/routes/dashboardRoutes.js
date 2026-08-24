import express from "express";

import protect from "../middlewares/authMiddleware.js";

import getDashboardStats from "../controllers/dashboard/getDashboardStats.js";
import getDashboardRecent from "../controllers/dashboard/getDashboardRecent.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

router.get("/recent", protect, getDashboardRecent);

export default router;