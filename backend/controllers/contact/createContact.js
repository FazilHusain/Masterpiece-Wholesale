import Contact from "../../models/Contact.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import sendEmail from "../../services/email/sendEmail.js";

import contactLeadTemplate from "../../services/email/templates/contactLead.js";

import contactAutoReplyTemplate from "../../services/email/templates/contactAutoReply.js";

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return next(new ApiError(400, "Please fill all required fields."));
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress:
        req.headers["x-forwarded-for"] || req.socket.remoteAddress || "",
      browser: req.headers["user-agent"] || "",
    });

    /*
    ===================================
    TODO (Zoho Phase)

    1. Owner Notification

    2. Customer Auto Reply

    ===================================
    */

    await sendEmail({
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Enquiry - ${name}`,
      html: contactLeadTemplate({
        name,
        email,
        phone,
        subject,
        message,
      }),
    });

    await sendEmail({
      to: email,
      subject: "We've Received Your Enquiry",
      html: contactAutoReplyTemplate({
        name,
      }),
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          contact,
          "Thank you! Your message has been sent successfully.",
        ),
      );
  } catch (error) {
    next(error);
  }
};

export default createContact;
