import jwt from "jsonwebtoken";

import User from "../models/User.js";

const optionalTradeAuthMiddleware = async (
  req,
  res,
  next,
) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token =
        req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return next();
    }

    if (user.role !== "trade") {
      return next();
    }

    req.user = user;

    next();
  } catch (error) {
    next();
  }
};

export default optionalTradeAuthMiddleware;