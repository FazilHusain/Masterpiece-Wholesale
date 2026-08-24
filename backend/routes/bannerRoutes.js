import express from "express";

import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

import createBanner from "../controllers/banner/createBanner.js";
import getBanners from "../controllers/banner/getBanners.js";
import getSingleBanner from "../controllers/banner/getSingleBanner.js";
import updateBanner from "../controllers/banner/updateBanner.js";
import deleteBanner from "../controllers/banner/deleteBanner.js";
import uploadDesktopImage from "../controllers/banner/uploadDesktopImage.js";
import uploadMobileImage from "../controllers/banner/uploadMobileImage.js";

const router = express.Router();

router
  .route("/")
  .get(getBanners)
  .post(protect, createBanner);

router
  .route("/:id")
  .get(getSingleBanner)
  .put(protect, updateBanner)
  .delete(protect, deleteBanner);

router.post(
  "/:id/upload-desktop-image",
  protect,
  upload.single("image"),
  uploadDesktopImage
);

router.post(
  "/:id/upload-mobile-image",
  protect,
  upload.single("image"),
  uploadMobileImage
);

export default router;