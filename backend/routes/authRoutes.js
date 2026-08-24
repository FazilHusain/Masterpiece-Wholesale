import express from "express";

import loginAdmin from "../controllers/auth/loginAdmin.js";
import logout from "../controllers/auth/logout.js";
import forgotPassword from "../controllers/auth/forgotPassword.js";
import resetPassword from "../controllers/auth/resetPassword.js";

import protect from "../middlewares/authMiddleware.js";
import profile from "../controllers/auth/profile.js";
import changePassword from "../controllers/auth/changePassword.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/logout", protect, logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/profile", protect, profile);

router.put("/change-password", protect, changePassword);

export default router;