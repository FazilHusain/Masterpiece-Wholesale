import Journal from "../../models/Journal.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getAdminJournal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const journal = await Journal.findById(id);

    if (!journal) {
      return next(
        new ApiError(404, "Journal not found.")
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          journal,
          "Journal fetched successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

export default getAdminJournal;