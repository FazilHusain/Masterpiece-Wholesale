import Admin from "../../models/Admin.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return next(new ApiError(404, "Admin not found."));
    }

    // Prevent self delete
    if (req.admin._id.toString() === id) {
      return next(
        new ApiError(
          400,
          "You cannot delete your own account."
        )
      );
    }

    // Only Super Admin can delete admins
    if (req.admin.role !== "super-admin") {
      return next(
        new ApiError(
          403,
          "You are not authorized to delete admins."
        )
      );
    }

    // Prevent deleting last Super Admin
    if (admin.role === "super-admin") {
      const totalSuperAdmins = await Admin.countDocuments({
        role: "super-admin",
      });

      if (totalSuperAdmins <= 1) {
        return next(
          new ApiError(
            400,
            "Last Super Admin cannot be deleted."
          )
        );
      }
    }

    await admin.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Admin deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteAdmin;