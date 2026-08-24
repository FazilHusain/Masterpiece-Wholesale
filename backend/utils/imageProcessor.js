import sharp from "sharp";
import streamifier from "streamifier";

import cloudinary from "../config/cloudinary.js";

const processImage = async (
  file,
  folder,
  width = 1600,
  quality = 85
) => {
  if (!file) return "";

  const buffer = await sharp(file.buffer)
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp({
      quality,
    })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `his-masterpiece/${folder}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default processImage;