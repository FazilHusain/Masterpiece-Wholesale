import WholesaleApplication from "../../models/WholesaleApplication.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateApplication = async (req, res, next) => {
  try {
    const application = await WholesaleApplication.findById(req.params.id);

    if (!application) {
      return next(new ApiError(404, "Application not found."));
    }

    const allowedFields = [
      "adminNotes",
      "status",
      "categoriesInterested",
      "annualPurchase",
      "message",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        application[field] = req.body[field];
      }
    });

    await application.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, application, "Application updated successfully."),
      );
  } catch (error) {
    next(error);
  }
};

export default updateApplication;
