import Banner from "../../models/Banner.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import removeFile from "../../utils/removeFile.js";
import uploadBannerImage from "../../utils/uploadBannerImage.js";

const uploadMobileImage = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return next(new ApiError(404, "Banner not found."));
    }

    if (!req.file) {
      return next(new ApiError(400, "Image is required."));
    }

    if (banner.mobileImage) {
      await removeFile(banner.mobileImage);
    }

    banner.mobileImage = await uploadBannerImage(req.file);

    await banner.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, banner, "Mobile image uploaded successfully."),
      );
  } catch (error) {
    next(error);
  }
};

export default uploadMobileImage;
