import Contact from "../../models/Contact.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getSingleContact = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {
      return next(
        new ApiError(
          404,
          "Contact not found."
        )
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        contact,
        "Contact fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSingleContact;