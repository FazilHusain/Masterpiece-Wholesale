import User from "../../models/User.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateOtp from "../../utils/generateOtp.js";
import sendEmail from "../../services/email/sendEmail.js";
import forgotPasswordTemplate from "../../services/email/templates/forgotPassword.js";

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ApiError(400, "Email is required."));
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

    const otp = generateOtp();

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save({ validateBeforeSave: false });

    // Development
    if (!process.env.SMTP_USER) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            otp,
          },
          "OTP generated successfully.",
        ),
      );
    }

    // Production Email
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: forgotPasswordTemplate({
        name: user.firstName,
        otp,
      }),
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "OTP sent successfully."));
  } catch (error) {
    next(error);
  }
};

export default forgotPassword;
