import express from "express";

import upload from "../middlewares/uploadMiddleware.js";
import protect from "../middlewares/authMiddleware.js";

import getJournals from "../controllers/journal/getJournals.js";
import getAdminJournal from "../controllers/journal/getAdminJournal.js";

import createJournal from "../controllers/journal/createJournal.js";
import updateJournal from "../controllers/journal/updateJournal.js";
import deleteJournal from "../controllers/journal/deleteJournal.js";
import uploadFeaturedImage from "../controllers/journal/uploadFeaturedImage.js";

const router = express.Router();

/* ==========================================
   Protected Routes
========================================== */

// GET ALL JOURNALS
router.get("/", protect, getJournals);

// GET SINGLE JOURNAL FOR EDIT
router.get("/:id", protect, getAdminJournal);

// CREATE
router.post("/", protect, createJournal);

// UPDATE
router.put("/:id", protect, updateJournal);

// DELETE
router.delete("/:id", protect, deleteJournal);

// FEATURED IMAGE
router.post(
  "/:id/upload-featured-image",
  protect,
  upload.single("image"),
  uploadFeaturedImage
);

export default router;