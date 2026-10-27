import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

const uploadVideo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // =============================
    // FIND PRODUCT
    // =============================

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError(404, "Product not found."));
    }

    // =============================
    // CHECK FILE
    // =============================

    if (!req.file) {
      return next(new ApiError(400, "Please upload a video."));
    }

    // =============================
    // CHECK VIDEO TYPE
    // =============================

    const allowedVideoTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedVideoTypes.includes(req.file.mimetype)) {
      return next(
        new ApiError(
          400,
          "Only MP4, WEBM and MOV videos are allowed.",
        ),
      );
    }

    // =============================
    // UPLOAD TO CLOUDINARY
    // =============================

    const uploadedVideo = await new Promise(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: "his-masterpiece/products/videos",
              resource_type: "video",
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }

              resolve(result);
            },
          );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);
      },
    );

    // =============================
    // VIDEO THUMBNAIL
    // =============================

    const thumbnail = cloudinary.url(
      uploadedVideo.public_id,
      {
        resource_type: "video",
        secure: true,
        format: "jpg",
      },
    );

    // =============================
    // ADD VIDEO TO PRODUCT
    // =============================

    product.videos.push({
      title:
        req.body?.title ||
        `${product.name} Product Video`,

      url: uploadedVideo.secure_url,

      thumbnail,

      sortOrder: product.videos.length,
    });

    await product.save();

    // =============================
    // RESPONSE
    // =============================

    return res.status(200).json(
      new ApiResponse(
        200,
        product.videos,
        "Product video uploaded successfully.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default uploadVideo;