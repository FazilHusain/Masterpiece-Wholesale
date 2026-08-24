import Contact from "../../models/Contact.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ApiError(404, "Contact not found.")
      );
    }

    await contact.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Contact deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteContact;