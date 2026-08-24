import express from "express";

import tradeLogin from "../controllers/wholesale/tradeLogin.js";
import forgotPassword from "../controllers/wholesale/forgotPassword.js";
import resetPassword from "../controllers/wholesale/resetPassword.js";
import setPassword from "../controllers/wholesale/setPassword.js";
import tradeAuthMiddleware from "../middlewares/tradeAuthMiddleware.js";

import getTradeProfile from "../controllers/wholesale/getTradeProfile.js";
import updateTradeProfile from "../controllers/wholesale/updateTradeProfile.js";

const router = express.Router();

router.post("/trade/login", tradeLogin);

router.get("/trade/me", tradeAuthMiddleware, getTradeProfile);

router.put("/trade/profile", tradeAuthMiddleware, updateTradeProfile);

router.post("/trade/forgot-password", forgotPassword);

router.post("/trade/reset-password", resetPassword);

router.post("/trade/set-password", tradeAuthMiddleware, setPassword);

export default router;
