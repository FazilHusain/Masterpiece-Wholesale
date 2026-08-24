import sharp from "sharp";
import streamifier from "streamifier";

import cloudinary from "../config/cloudinary.js";

const uploadBannerImage = async (file) => {
  if (!file) return "";

  const buffer = await sharp(file.buffer)
    .resize({
      width: 1920,
      withoutEnlargement: true,
    })
    .webp({
      quality: 90,
    })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "his-masterpiece/banners",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadBannerImage;