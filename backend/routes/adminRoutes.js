import express from "express";

import protect from "../middlewares/authMiddleware.js";

import getAdmins from "../controllers/admin/getAdmins.js";
import getSingleAdmin from "../controllers/admin/getSingleAdmin.js";
import createAdmin from "../controllers/admin/createAdmin.js";
import updateAdmin from "../controllers/admin/updateAdmin.js";
import deleteAdmin from "../controllers/admin/deleteAdmin.js";
import toggleAdminStatus from "../controllers/admin/toggleAdminStatus.js";
import changeAdminPassword from "../controllers/admin/changeAdminPassword.js";
import resetAdminPassword from "../controllers/admin/resetAdminPassword.js";

const router = express.Router();

/* ==========================
   Admin Management
========================== */

router.get("/", protect, getAdmins);

router.get("/:id", protect, getSingleAdmin);

router.post("/", protect, createAdmin);

router.put("/:id", protect, updateAdmin);

router.delete("/:id", protect, deleteAdmin);

router.patch("/:id/status", protect, toggleAdminStatus);

router.patch("/:id/password", protect, changeAdminPassword);

router.patch("/:id/reset-password", protect, resetAdminPassword);

export default router;
