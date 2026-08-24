import jwt from "jsonwebtoken";
import Admin from "../../models/Admin.js";

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    /* ==========================
       Validation
    ========================== */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    /* ==========================
       Find Admin
    ========================== */

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* ==========================
       Active Check
    ========================== */

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is disabled.",
      });
    }

    /* ==========================
       Password Check
    ========================== */

    const isMatched = await admin.matchPassword(password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* ==========================
       JWT
    ========================== */

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    /* ==========================
       Last Login
    ========================== */

    admin.lastLogin = new Date();

    await admin.save();

    /* ==========================
       Cookie
    ========================== */

    res.status(200).json({
      success: true,
      message: "Login Successful",

      token,

      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
      },
    });

    /* ==========================
       Response
    ========================== */

  } catch (error) {
    next(error);
  }
};

export default loginAdmin;
