import Admin from "../../models/Admin.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createAdmin = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      isActive,
    } = req.body;

    // Required Fields
    if (!name || !email || !password || !role) {
      return next(
        new ApiError(
          400,
          "Name, email, password and role are required."
        )
      );
    }

    // Email Exists
    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return next(
        new ApiError(
          400,
          "Admin already exists with this email."
        )
      );
    }

    // Allowed Roles
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

    // Create Admin
    const admin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      isActive:
        typeof isActive === "boolean"
          ? isActive
          : true,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          isActive: admin.isActive,
          createdAt: admin.createdAt,
        },
        "Admin created successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default createAdmin;