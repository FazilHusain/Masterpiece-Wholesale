import WholesaleApplication from "../../models/WholesaleApplication.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteApplication = async (req, res, next) => {
  try {
    const application =
      await WholesaleApplication.findById(req.params.id);

    if (!application) {
      return next(
        new ApiError(404, "Application not found.")
      );
    }

    await application.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Application deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteApplication;