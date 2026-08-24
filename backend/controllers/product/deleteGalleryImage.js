import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import removeFile from "../../utils/removeFile.js";

const deleteGalleryImage = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError(404, "Product not found."));
    }

    const image = product.gallery.id(imageId);

    if (!image) {
      return next(new ApiError(404, "Gallery image not found."));
    }

    await removeFile(image.url);

    image.deleteOne();

    await product.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        product.gallery,
        "Gallery image deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteGalleryImage;