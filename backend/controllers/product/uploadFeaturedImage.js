import Product from "../../models/Product.js";
import processImage from "../../utils/imageProcessor.js";
import removeFile from "../../utils/removeFile.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const uploadFeaturedImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(
        new ApiError(404, "Product not found.")
      );
    }

    if (!req.file) {
      return next(
        new ApiError(400, "Please upload an image.")
      );
    }

    const oldImage =
      product.featuredImage;

    const image =
      await processImage(
        req.file,
        "products"
      );

    product.featuredImage = image;

    await product.save();

    if (oldImage) {
      try {
        await removeFile(oldImage);
      } catch (error) {
        console.log(
          "Old product image removal failed:",
          error.message
        );
      }
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        product,
        "Featured image uploaded successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default uploadFeaturedImage;