import express from "express";

import protect from "../middlewares/authMiddleware.js";
import tradeAuthMiddleware from "../middlewares/tradeAuthMiddleware.js";

import createQuickOrder from "../controllers/quickOrder/createQuickOrder.js";
import getQuickOrders from "../controllers/quickOrder/getQuickOrders.js";
import getSingleQuickOrder from "../controllers/quickOrder/getSingleQuickOrder.js";
import updateQuickOrder from "../controllers/quickOrder/updateQuickOrder.js";
import updateQuickOrderStatus from "../controllers/quickOrder/updateQuickOrderStatus.js";
import addAdminNote from "../controllers/quickOrder/addAdminNote.js";
import deleteQuickOrder from "../controllers/quickOrder/deleteQuickOrder.js";
import getMyQuickOrders from "../controllers/quickOrder/getMyQuickOrder.js";

const router = express.Router();

/* ==========================
   Trade User
========================== */

router.post("/", tradeAuthMiddleware, createQuickOrder);
router.get("/my-orders", tradeAuthMiddleware, getMyQuickOrders);

/* ==========================
   Admin
========================== */

router.get("/", protect, getQuickOrders);

router.get("/:id", protect, getSingleQuickOrder);

router.patch("/:id", protect, updateQuickOrder);

router.patch("/:id/status", protect, updateQuickOrderStatus);

router.patch("/:id/admin-note", protect, addAdminNote);

router.delete("/:id", protect, deleteQuickOrder);

export default router;
