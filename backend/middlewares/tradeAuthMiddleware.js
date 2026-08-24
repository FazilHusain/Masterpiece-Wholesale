import jwt from "jsonwebtoken";

import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const tradeAuthMiddleware = async (req, res, next) => {
  console.log("========== TRADE AUTH ==========");
  console.log(req.method);
  console.log(req.originalUrl);
  console.log(req.headers.authorization);
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Authorization token is missing."));
    }

    const token = authHeader.split(" ")[1];

    console.log("HEADER TOKEN =>", token);

    console.log("LOCAL TOKEN SHOULD MATCH");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED =>", decoded);

    const userId = decoded.id || decoded._id;

    console.log("User ID =>", userId);

    const user = await User.findById(userId).select("-password");

    console.log("Found User =>", user);
    if (!user) {
      return next(new ApiError(401, "User not found."));
    }

    if (user.role !== "trade") {
      return next(
        new ApiError(403, "You are not authorized as a trade customer."),
      );
    }

    if (!user.isActive) {
      return next(new ApiError(403, "Your account has been deactivated."));
    }

    if (user.approvalStatus !== "approved") {
      return next(new ApiError(403, "Your trade account is not approved."));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token."));
  }
};

export default tradeAuthMiddleware;
