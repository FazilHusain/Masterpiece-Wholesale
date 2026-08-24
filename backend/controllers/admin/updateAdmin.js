import Admin from "../../models/Admin.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return next(new ApiError(404, "Admin not found."));
    }

    const {
      name,
      email,
      role,
      isActive,
    } = req.body;

    // Email Validation
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });

      if (existingAdmin) {
        return next(
          new ApiError(
            400,
            "Email is already in use."
          )
        );
      }

      admin.email = email.toLowerCase().trim();
    }

    // Role Validation
    if (role) {
      const allowedRoles = [
        "super-admin",
        "admin",
        "editor",
      ];

      if (!allowedRoles.includes(role)) {
        return next(
          new ApiError(
            400,
            "Invalid admin role."
          )
        );
      }

      admin.role = role;
    }

    // Name
    if (name) {
      admin.name = name.trim();
    }

    // Active Status
    if (typeof isActive === "boolean") {
      admin.isActive = isActive;
    }

    await admin.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          isActive: admin.isActive,
          updatedAt: admin.updatedAt,
        },
        "Admin updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default updateAdmin;