import Admin from "../../models/Admin.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const changeAdminPassword = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return next(new ApiError(400, "All password fields are required."));
    }

    if (newPassword !== confirmPassword) {
      return next(
        new ApiError(400, "New password and confirm password do not match."),
      );
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return next(new ApiError(404, "Admin not found."));
    }

    if (req.admin.role !== "super-admin" && req.admin._id.toString() !== id) {
      return next(
        new ApiError(403, "You are not authorized to change this password."),
      );
    }

    // Verify Current Password
    const isPasswordCorrect = await admin.matchPassword(currentPassword);

    if (!isPasswordCorrect) {
      return next(new ApiError(400, "Current password is incorrect."));
    }

    // Prevent same password
    const isSamePassword = await admin.matchPassword(newPassword);

    if (isSamePassword) {
      return next(
        new ApiError(
          400,
          "New password must be different from current password.",
        ),
      );
    }

    admin.password = newPassword;

    await admin.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Password changed successfully."));
  } catch (error) {
    next(error);
  }
};

export default changeAdminPassword;
