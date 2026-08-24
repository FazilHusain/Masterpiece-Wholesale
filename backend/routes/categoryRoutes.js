import express from "express";

import createCategory from "../controllers/category/createCategory.js";
import getCategories from "../controllers/category/getCategories.js";
import getSingleCategory from "../controllers/category/getSingleCategory.js";
import updateCategory from "../controllers/category/updateCategory.js";
import deleteCategory from "../controllers/category/deleteCategory.js";

import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  createCategory
);

router.get("/", getCategories);

router.get("/:id", getSingleCategory);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  updateCategory
);

router.delete("/:id", protect, deleteCategory);

export default router;