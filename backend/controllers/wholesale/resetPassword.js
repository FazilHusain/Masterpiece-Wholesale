import User from "../../models/User.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import sendEmail from "../../services/email/sendEmail.js";

import passwordChangedTemplate from "../../services/email/templates/passwordChanged.js";

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return next(
        new ApiError(400, "Email, OTP and new password are required."),
      );
    }

    if (password.length < 8) {
      return next(
        new ApiError(400, "Password must be at least 8 characters long."),
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return next(new ApiError(404, "Trade account not found."));
    }

    if (user.role !== "trade") {
      return next(
        new ApiError(403, "You are not authorized as a trade customer."),
      );
    }

    if (!user.resetPasswordOtp) {
      return next(new ApiError(400, "OTP not found."));
    }

    if (user.resetPasswordOtp !== otp) {
      return next(new ApiError(400, "Invalid OTP."));
    }

    if (
      !user.resetPasswordOtpExpires ||
      user.resetPasswordOtpExpires < new Date()
    ) {
      return next(new ApiError(400, "OTP has expired."));
    }

    // Update Password
    user.password = password;

    // Clear OTP
    user.resetPasswordOtp = "";
    user.resetPasswordOtpExpires = null;

    // User can login normally now
    user.mustChangePassword = false;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Changed Successfully",
      html: passwordChangedTemplate({
        name: user.firstName,
      }),
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successfully."));
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
