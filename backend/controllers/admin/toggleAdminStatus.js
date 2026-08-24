import Admin from "../../models/Admin.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const toggleAdminStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return next(new ApiError(404, "Admin not found."));
    }

    // Logged-in Admin
    const loggedInAdmin = req.admin;

    // Prevent self deactivation
    if (
      loggedInAdmin &&
      loggedInAdmin._id.toString() === id &&
      admin.isActive
    ) {
      return next(
        new ApiError(
          400,
          "You cannot deactivate your own account."
        )
      );
    }

    // Prevent last Super Admin deactivation
    if (
      admin.role === "super-admin" &&
      admin.isActive
    ) {
      const totalSuperAdmins = await Admin.countDocuments({
        role: "super-admin",
        isActive: true,
      });

      if (totalSuperAdmins <= 1) {
        return next(
          new ApiError(
            400,
            "Last Super Admin cannot be deactivated."
          )
        );
      }
    }

    admin.isActive = !admin.isActive;

    await admin.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: admin._id,
          isActive: admin.isActive,
        },
        `Admin ${
          admin.isActive ? "activated" : "deactivated"
        } successfully.`
      )
    );
  } catch (error) {
    next(error);
  }
};

export default toggleAdminStatus;