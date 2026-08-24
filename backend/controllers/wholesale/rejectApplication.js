import WholesaleApplication from "../../models/WholesaleApplication.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import sendEmail from "../../services/email/sendEmail.js";

import tradeRejectedTemplate from "../../services/email/templates/tradeRejected.js";

const rejectApplication = async (req, res, next) => {
  try {
    const { adminNotes = "" } = req.body;

    const application = await WholesaleApplication.findById(req.params.id);

    if (!application) {
      return next(new ApiError(404, "Application not found."));
    }

    // Prevent rejecting an already approved application
    if (application.status === "Approved") {
      return next(
        new ApiError(400, "Approved application cannot be rejected."),
      );
    }

    // Prevent duplicate rejection
    if (application.status === "Rejected") {
      return next(new ApiError(400, "Application is already rejected."));
    }

    application.status = "Rejected";
    application.adminNotes = adminNotes;
    application.reviewedAt = new Date();

    if (req.admin) {
      application.reviewedBy = req.admin._id;
    }

    await application.save();

    /*
      TODO

      Zoho Mail

      Rejection Mail
    */

    await sendEmail({
      to: application.email,
      subject: "Trade Application Update",
      html: tradeRejectedTemplate({
        name: `${application.firstName} ${application.lastName}`,
        reason: adminNotes,
      }),
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, application, "Application rejected successfully."),
      );
  } catch (error) {
    next(error);
  }
};

export default rejectApplication;
