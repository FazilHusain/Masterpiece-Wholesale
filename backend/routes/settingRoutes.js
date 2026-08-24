import express from "express";

import protect from "../middlewares/authMiddleware.js";

import getSettings from "../controllers/settings/getSettings.js";
import updateSettings from "../controllers/settings/updateSettings.js";

import upload from "../middlewares/uploadMiddleware.js";

import uploadSettingImage from "../controllers/settings/uploadSettingImage.js";

const router = express.Router();

router.get("/", protect, getSettings);

router.put("/", protect, updateSettings);

router.post(
  "/upload/:type",
  protect,
  upload.single("image"),
  uploadSettingImage,
);

export default router;
