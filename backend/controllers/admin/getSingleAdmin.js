import Admin from "../../models/Admin.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getSingleAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id).select(
      "-password -otpCode -otpExpiresAt"
    );

    if (!admin) {
      return next(new ApiError(404, "Admin not found."));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        admin,
        "Admin fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSingleAdmin;