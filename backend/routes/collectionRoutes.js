import express from "express";

import createCollection from "../controllers/collection/createCollection.js";
import getCollections from "../controllers/collection/getCollections.js";
import getSingleCollection from "../controllers/collection/getSingleCollection.js";
import updateCollection from "../controllers/collection/updateCollection.js";
import deleteCollection from "../controllers/collection/deleteCollection.js";

import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  createCollection
);

router.get("/", getCollections);

router.get("/:id", getSingleCollection);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "thumbnailImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  updateCollection
);

router.delete("/:id", protect, deleteCollection);

export default router;