import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const protect = async (req, res, next) => {
  try {
    let token = null;

    /* ==========================
       Cookie Token
    ========================== */

    if (req.cookies?.adminToken) {
      token = req.cookies.adminToken;
    }

    /* ==========================
       Bearer Token (Postman)
    ========================== */

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /* ==========================
       Token Missing
    ========================== */

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access.",
      });
    }

    /* ==========================
       Verify JWT
    ========================== */

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ==========================
       Find Admin
    ========================== */

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been disabled.",
      });
    }

    /* ==========================
       Attach User
    ========================== */

    req.user = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.",
    });
  }
};

export default protect;