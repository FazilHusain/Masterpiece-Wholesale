import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const reorderGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { gallery } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError(404, "Product not found."));
    }

    if (!Array.isArray(gallery)) {
      return next(new ApiError(400, "Gallery data is invalid."));
    }

    gallery.forEach((item) => {
      const image = product.gallery.id(item._id);

      if (image) {
        image.sortOrder = item.sortOrder;
      }
    });

    product.gallery.sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

    await product.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        product.gallery,
        "Gallery reordered successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default reorderGallery;