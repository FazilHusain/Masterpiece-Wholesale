import express from "express";

import protect from "../middlewares/authMiddleware.js";

import createSampleOrder from "../controllers/sampleOrder/createSampleOrder.js";
import getSampleOrders from "../controllers/sampleOrder/getSampleOrders.js";
import getSingleSampleOrder from "../controllers/sampleOrder/getSingleSampleOrder.js";
import updateSampleStatus from "../controllers/sampleOrder/updateSampleStatus.js";
import addAdminNote from "../controllers/sampleOrder/addAdminNote.js";
import deleteSampleOrder from "../controllers/sampleOrder/deleteSampleOrder.js";
import updateSampleOrder from "../controllers/sampleOrder/updateSampleOrder.js";
import tradeAuthMiddleware from "../middlewares/tradeAuthMiddleware.js";
import getMySampleOrders from "../controllers/sampleOrder/getMySampleOrders.js";
import optionalTradeAuthMiddleware from "../middlewares/optionalTradeAuthMiddleware.js";
import createSamplePayment from "../controllers/sampleOrder/createSamplePayment.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getSampleOrders)
  .post(optionalTradeAuthMiddleware, createSampleOrder);

/* ==========================
   Trade User
========================== */

router.get("/my-orders", tradeAuthMiddleware, getMySampleOrders);

router.patch("/:id/status", protect, updateSampleStatus);

router.patch("/:id/admin-note", protect, addAdminNote);

router.post("/:id/payment", optionalTradeAuthMiddleware, createSamplePayment);

router
  .route("/:id")
  .get(protect, getSingleSampleOrder)
  .patch(protect, updateSampleOrder)
  .delete(protect, deleteSampleOrder);

export default router;
