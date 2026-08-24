import Contact from "../../models/Contact.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["Unread", "Read"].includes(status)) {
      return next(
        new ApiError(400, "Invalid status.")
      );
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ApiError(404, "Contact not found.")
      );
    }

    contact.status = status;

    await contact.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        contact,
        "Contact status updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default updateContactStatus;