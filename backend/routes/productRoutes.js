import express from "express";

import protect from "../middlewares/authMiddleware.js";

import createProduct from "../controllers/product/createProduct.js";
import getProducts from "../controllers/product/getProducts.js";
import getSingleProduct from "../controllers/product/getSingleProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import deleteProduct from "../controllers/product/deleteProduct.js";

import upload from "../middlewares/uploadMiddleware.js";

import uploadFeaturedImage from "../controllers/product/uploadFeaturedImage.js";
import uploadGalleryImages from "../controllers/product/uploadGalleryImages.js";
import deleteGalleryImage from "../controllers/product/deleteGalleryImage.js";
import reorderGallery from "../controllers/product/reorderGallery.js";

import searchProducts from "../controllers/website/product/searchProducts.js";
import uploadStoryImage from "../controllers/product/uploadStoryImage.js";
import uploadVideo from "../controllers/product/uploadVideo.js";

const router = express.Router();

// =============================
// CREATE PRODUCT
// =============================

router.post("/", protect, upload.single("featuredImage"), createProduct);

// =============================
// GET PRODUCTS
// =============================

router.get("/", getProducts);

// =============================
// SEARCH PRODUCTS
// =============================

router.get("/search", searchProducts);

// =============================
// GET SINGLE PRODUCT
// =============================

router.get("/:id", getSingleProduct);

// =============================
// UPDATE PRODUCT
// =============================

router.put("/:id", protect, upload.single("featuredImage"), updateProduct);

// =============================
// DELETE PRODUCT
// =============================

router.delete("/:id", protect, deleteProduct);

// =============================
// FEATURED IMAGE
// =============================

router.post(
  "/:id/featured-image",
  protect,
  upload.single("image"),
  uploadFeaturedImage,
);

// =============================
// GALLERY
// =============================

router.post(
  "/:id/gallery",
  protect,
  upload.array("images", 10),
  uploadGalleryImages,
);

// =============================
// PRODUCT VIDEO
// =============================

router.post(
  "/:id/video",
  protect,
  upload.single("video"),
  uploadVideo,
);

router.post(
  "/:id/story-image",
  protect,
  upload.single("image"),
  uploadStoryImage,
);

// =============================
// DELETE GALLERY IMAGE
// =============================

router.delete("/:id/gallery/:imageId", protect, deleteGalleryImage);

// =============================
// REORDER GALLERY
// =============================

router.put("/:id/gallery/reorder", protect, reorderGallery);

export default router;
