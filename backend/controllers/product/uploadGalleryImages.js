import Product from "../../models/Product.js";

import processImage from "../../utils/imageProcessor.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const uploadGalleryImages = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError(404, "Product not found."));
    }

    if (!req.files || req.files.length === 0) {
      return next(new ApiError(400, "Please upload at least one image."));
    }

    if (product.gallery.length + req.files.length > 10) {
      return next(new ApiError(400, "Maximum 10 gallery images allowed."));
    }

    const galleryImages = [];

    for (const file of req.files) {
      const image = await processImage(file, "products", 1600, 90);

      galleryImages.push({
        url: image,
        alt: product.name,
      });
    }

    product.gallery.push(...galleryImages);

    await product.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          product.gallery,
          "Gallery images uploaded successfully.",
        ),
      );
  } catch (error) {
    next(error);
  }
};

export default uploadGalleryImages;
