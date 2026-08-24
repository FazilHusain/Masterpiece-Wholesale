import cloudinary from "../config/cloudinary.js";

const removeFile = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    // Local image hai to ignore
    if (!imageUrl.includes("res.cloudinary.com")) {
      return;
    }

    const uploadIndex = imageUrl.indexOf("/upload/");

    if (uploadIndex === -1) return;

    let publicId = imageUrl.substring(uploadIndex + 8);

    // version remove
    publicId = publicId.replace(/^v\d+\//, "");

    // extension remove
    publicId = publicId.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary Delete:", error.message);
  }
};

export default removeFile;