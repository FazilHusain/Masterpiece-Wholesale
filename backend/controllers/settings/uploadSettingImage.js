import Setting from "../../models/Setting.js";

import processImage from "../../utils/imageProcessor.js";
import removeFile from "../../utils/removeFile.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const uploadSettingImage = async (req, res, next) => {
  try {
    const { type } = req.params;

    const allowedTypes = ["logo", "footerLogo", "favicon"];

    if (!allowedTypes.includes(type)) {
      return next(new ApiError(400, "Invalid image type."));
    }

    if (!req.file) {
      return next(new ApiError(400, "Please upload an image."));
    }

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    if (settings[type]) {
      await removeFile(settings[type]);
    }

    let width = 600;

    if (type === "favicon") {
      width = 128;
    }

    const image = await processImage(req.file, "settings", width, 90);

    settings[type] = image;

    await settings.save();

    return res
      .status(200)
      .json(new ApiResponse(200, settings, `${type} uploaded successfully.`));
  } catch (error) {
    next(error);
  }
};

export default uploadSettingImage;
