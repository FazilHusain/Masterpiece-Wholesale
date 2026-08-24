import jwt from "jsonwebtoken";

import User from "../../models/User.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const tradeLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate Request
    if (!email || !password) {
      return next(new ApiError(400, "Email and password are required."));
    }

    // Find User
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return next(new ApiError(401, "Invalid email or password."));
    }

    // Check Trade Role
    if (user.role !== "trade") {
      return next(
        new ApiError(403, "You are not authorized as a trade customer."),
      );
    }

    // Check Approval Status
    if (user.approvalStatus !== "approved") {
      return next(
        new ApiError(
          403,
          "Your trade account is pending approval. Please contact support.",
        ),
      );
    }

    // Verify Password
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return next(new ApiError(401, "Invalid email or password."));
    }

    // Update Last Login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    console.log("LOGIN USER ID =>", user._id);

    // Generate JWT
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    console.log("NEW TOKEN =>", token);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          token,
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            businessName: user.businessName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            approvalStatus: user.approvalStatus,
            mustChangePassword: user.mustChangePassword,
            lastLogin: user.lastLogin,
          },
        },
        "Trade login successful.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default tradeLogin;
