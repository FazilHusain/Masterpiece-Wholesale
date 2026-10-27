import WholesaleApplication from "../../models/WholesaleApplication.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateWholesaleApplicationNumber from "../../utils/generateWholesaleApplicationNumber.js";
import sendEmail from "../../services/email/sendEmail.js";

import wholesaleLeadTemplate from "../../services/email/templates/wholesaleLead.js";
import wholesaleReceivedTemplate from "../../services/email/templates/wholesaleReceived.js";

const createApplication = async (req, res, next) => {
  try {
    let {
      firstName,
      lastName,
      businessName,
      email,
      whatsapp,
      businessType,
      businessAddress,
      city,
      state,
      country,
      categoriesInterested,
      orderItems,
      annualPurchase,
      website,
      yearsInBusiness,
      message,
    } = req.body;

    // Required Field Validation
    if (
      !firstName ||
      !lastName ||
      !businessName ||
      !email ||
      !whatsapp ||
      !businessType ||
      !businessAddress ||
      !country
    ) {
      return next(new ApiError(400, "Please fill all required fields."));
    }

    // Normalize Data
    firstName = firstName.trim();
    lastName = lastName.trim();
    businessName = businessName.trim();
    email = email.toLowerCase().trim();
    whatsapp = whatsapp.trim();

    businessAddress = businessAddress?.trim() || "";
    city = city?.trim() || "";
    state = state?.trim() || "";
    country = country?.trim() || "";
    website = website?.trim() || "";
    yearsInBusiness = yearsInBusiness || "";
    annualPurchase = annualPurchase || "";
    message = message?.trim() || "";
    categoriesInterested = categoriesInterested || [];
    orderItems = message?.trim() || "";

    // Duplicate Check
    const alreadyExists = await WholesaleApplication.findOne({
      email,
    });

    if (alreadyExists) {
      return next(
        new ApiError(400, "Application already submitted with this email."),
      );
    }

    // Generate Application Number
    const applicationNumber = await generateWholesaleApplicationNumber();

    // Client Information
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      "";

    const browser = req.headers["user-agent"] || "";

    // Create Application
    const application = await WholesaleApplication.create({
      applicationNumber,

      firstName,
      lastName,
      businessName,
      email,
      whatsapp,
      businessType,

      businessAddress,
      city,
      state,
      country,

      categoriesInterested,

      orderItems,

      annualPurchase,
      website,
      yearsInBusiness,

      message,

      ipAddress,
      browser,
    });

    /*
    -------------------------------------------------------
    TODO (Later)
    -------------------------------------------------------

    Zoho Mail

    - Owner Notification
    - Customer Auto Reply

    -------------------------------------------------------
    */

    await sendEmail({
      to: process.env.OWNER_EMAIL,
      subject: `New Wholesale Application - ${application.applicationNumber}`,
      html: wholesaleLeadTemplate(application),
    });

    await sendEmail({
      to: application.email,
      subject: "Wholesale Application Received",
      html: wholesaleReceivedTemplate({
        name: `${application.firstName} ${application.lastName}`,
        applicationNumber: application.applicationNumber,
      }),
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          application,
          "Application submitted successfully.",
        ),
      );
  } catch (error) {
    next(error);
  }
};

export default createApplication;
