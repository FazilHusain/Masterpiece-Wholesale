import Admin from "../../models/Admin.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const resetAdminPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return next(
        new ApiError(400, "New password is required.")
      );
    }

    // Only Super Admin
    if (req.admin.role !== "super-admin") {
      return next(
        new ApiError(
          403,
          "Only Super Admin can reset passwords."
        )
      );
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return next(new ApiError(404, "Admin not found."));
    }

    admin.password = newPassword;

    await admin.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Password reset successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default resetAdminPassword;