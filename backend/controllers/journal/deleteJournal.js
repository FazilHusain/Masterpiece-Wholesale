import Journal from "../../models/Journal.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import removeFile from "../../utils/removeFile.js";

const deleteJournal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const journal = await Journal.findById(id);

    if (!journal) {
      return next(new ApiError(404, "Journal not found."));
    }

    if (journal.featuredImage) {
      await removeFile(journal.featuredImage);
    }

    await journal.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Journal deleted successfully.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default deleteJournal;