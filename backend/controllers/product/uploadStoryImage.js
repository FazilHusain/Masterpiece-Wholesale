import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import processImage from "../../utils/imageProcessor.js";
import removeFile from "../../utils/removeFile.js";

const uploadStoryImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { storyIndex } = req.body;

    // ==========================
    // PRODUCT
    // ==========================

    const product = await Product.findById(id);

    if (!product) {
      return next(
        new ApiError(404, "Product not found.")
      );
    }

    // ==========================
    // STORY INDEX
    // ==========================

    const index = Number(storyIndex);

    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= product.storySections.length
    ) {
      return next(
        new ApiError(
          400,
          "Invalid story section index."
        )
      );
    }

    // ==========================
    // IMAGE
    // ==========================

    if (!req.file) {
      return next(
        new ApiError(
          400,
          "Story image is required."
        )
      );
    }

    // ==========================
    // OLD IMAGE
    // ==========================

    const oldImage =
      product.storySections[index].image;

    // ==========================
    // UPLOAD NEW IMAGE
    // ==========================

    const newImage = await processImage(
      req.file,
      "products/story"
    );

    // ==========================
    // UPDATE STORY
    // ==========================

    product.storySections[index].image =
      newImage;

    // ==========================
    // SAVE
    // ==========================

    await product.save();

    // ==========================
    // REMOVE OLD IMAGE
    // ==========================

    if (oldImage) {
      try {
        await removeFile(oldImage);
      } catch (error) {
        console.log(
          "Old story image removal failed:",
          error.message
        );
      }
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        product.storySections,
        "Story image uploaded successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default uploadStoryImage;