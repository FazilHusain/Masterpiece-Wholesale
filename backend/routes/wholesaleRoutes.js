import express from "express";

import createApplication from "../controllers/wholesale/createApplication.js";
import getApplications from "../controllers/wholesale/getApplications.js";
import getSingleApplication from "../controllers/wholesale/getSingleApplication.js";
import approveApplication from "../controllers/wholesale/approveApplication.js";

import protect from "../middlewares/authMiddleware.js";
import rejectApplication from "../controllers/wholesale/rejectApplication.js";
import updateApplication from "../controllers/wholesale/updateApplication.js";
import deleteApplication from "../controllers/wholesale/deleteApplication.js";

const router = express.Router();

// Admin

router.get("/", protect, getApplications);

router.get("/:id", protect, getSingleApplication);

router.patch(
  "/:id/approve",
  protect,
  approveApplication
);

router.patch(
  "/:id/reject",
  protect,
  rejectApplication
);

router.patch(
  "/:id",
  protect,
  updateApplication
);

router.delete(
  "/:id",
  protect,
  deleteApplication
);

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.post(
  "/apply",
  createApplication
);

export default router;