import Banner from "../../models/Banner.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createBanner = async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      description,

      buttonText,
      buttonLink,

      page,
      type,

      displayOrder,

      startDate,
      endDate,

      isActive,
    } = req.body;

    if (!title?.trim()) {
      return next(new ApiError(400, "Banner title is required."));
    }

    if (!page) {
      return next(new ApiError(400, "Banner page is required."));
    }

    if (!type) {
      return next(new ApiError(400, "Banner type is required."));
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return next(new ApiError(400, "End date must be after start date."));
    }

    const banner = await Banner.create({
      title,
      subtitle,
      description,

      buttonText,
      buttonLink,

      page,
      type,

      displayOrder,

      startDate,
      endDate,

      isActive,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, banner, "Banner created successfully."));
  } catch (error) {
    next(error);
  }
};

export default createBanner;
