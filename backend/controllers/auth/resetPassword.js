import Admin from "../../models/Admin.js";

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    // =========================
    // FIND ADMIN
    // =========================

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // =========================
    // VERIFY OTP
    // =========================

    if (!admin.otpCode || !admin.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or has expired.",
      });
    }

    if (admin.otpCode !== otp.toString().trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // =========================
    // OTP EXPIRY
    // =========================

    if (new Date() > admin.otpExpiresAt) {
      admin.otpCode = null;
      admin.otpExpiresAt = null;

      await admin.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // =========================
    // UPDATE PASSWORD
    // =========================

    admin.password = password;

    // OTP must be single-use
    admin.otpCode = null;
    admin.otpExpiresAt = null;

    await admin.save();

    // =========================
    // RESPONSE
    // =========================

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default resetPassword;