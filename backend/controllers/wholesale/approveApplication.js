import WholesaleApplication from "../../models/WholesaleApplication.js";
import User from "../../models/User.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateTempPassword from "../../utils/generateTempPassword.js";
import sendEmail from "../../services/email/sendEmail.js";

import tradeApprovedTemplate from "../../services/email/templates/tradeApproved.js";

const approveApplication = async (req, res, next) => {
  try {
    const application = await WholesaleApplication.findById(req.params.id);

    if (!application) {
      return next(new ApiError(404, "Application not found."));
    }

    if (application.status === "Approved") {
      return next(new ApiError(400, "Application already approved."));
    }

    const password = generateTempPassword();

    const user = await User.create({
      firstName: application.firstName,
      lastName: application.lastName,

      businessName: application.businessName,

      email: application.email,

      phone: application.whatsapp,

      password,

      role: "trade",

      approvalStatus: "approved",

      country: application.country,

      businessType: application.businessType,

      website: application.website,

      addresses: [
        {
          fullName: `${application.firstName} ${application.lastName}`,

          phone: application.whatsapp,

          company: application.businessName,

          addressLine1: application.businessAddress,

          addressLine2: "",

          city: application.city,

          state: application.state,

          postalCode: application.postalCode || "",

          country: application.country,

          isDefault: true,
        },
      ],
    });

    application.status = "Approved";
    application.tradeUser = user._id;
    application.reviewedAt = new Date();

    if (req.user) {
      application.reviewedBy = req.user._id;
    }

    await application.save();

    /*
      Later

      Zoho Mail

      Welcome Mail

      Temp Password
    */

    await sendEmail({
      to: application.email,
      subject: "Trade Account Approved",
      html: tradeApprovedTemplate({
        name: `${application.firstName} ${application.lastName}`,
        email: application.email,
        temporaryPassword: password,
        loginUrl: `${process.env.CLIENT_URL}/trade-login`,
      }),
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          application,
          tempPassword: password,
        },
        "Application approved successfully.",
      ),
    );
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default approveApplication;
