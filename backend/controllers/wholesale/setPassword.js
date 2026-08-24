import User from "../../models/User.js";
import passwordChangedTemplate from "../../services/email/templates/passwordChanged.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const setPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(
        new ApiError(400, "Current password and new password are required."),
      );
    }

    if (newPassword.length < 8) {
      return next(
        new ApiError(400, "New password must be at least 8 characters."),
      );
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    if (user.role !== "trade") {
      return next(
        new ApiError(403, "You are not authorized as a trade customer."),
      );
    }

    const isPasswordCorrect = await user.matchPassword(currentPassword);

    if (!isPasswordCorrect) {
      return next(new ApiError(401, "Current password is incorrect."));
    }

    // Prevent same password
    if (currentPassword === newPassword) {
      return next(
        new ApiError(
          400,
          "New password must be different from the current password.",
        ),
      );
    }

    user.password = newPassword;
    user.mustChangePassword = false;

    // First login setup fields
    user.passwordSetupToken = "";
    user.passwordSetupExpires = null;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Changed Successfully",
      html: passwordChangedTemplate({
        name: user.firstName,
      }),
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          mustChangePassword: false,
        },
        "Password updated successfully.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default setPassword;
