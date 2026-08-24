import Journal from "../../models/Journal.js";

import processImage from "../../utils/imageProcessor.js";
import removeFile from "../../utils/removeFile.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const uploadFeaturedImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const journal = await Journal.findById(id);

    if (!journal) {
      return next(new ApiError(404, "Journal not found."));
    }

    if (!req.file) {
      return next(new ApiError(400, "Please upload an image."));
    }

    const oldImage = journal.featuredImage;

    const image = await processImage(req.file, "journal");

    if (oldImage) {
      await removeFile(oldImage);
    }

    journal.featuredImage = image;

    await journal.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, journal, "Featured image uploaded successfully."),
      );
  } catch (error) {
    next(error);
  }
};

export default uploadFeaturedImage;
