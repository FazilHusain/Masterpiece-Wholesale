import Banner from "../../models/Banner.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (
      req.body.startDate &&
      req.body.endDate &&
      new Date(req.body.startDate) > new Date(req.body.endDate)
    ) {
      return next(new ApiError(400, "End date must be after start date."));
    }

    Object.assign(banner, req.body);

    await banner.save();

    return res
      .status(200)
      .json(new ApiResponse(200, banner, "Banner updated successfully."));
  } catch (error) {
    next(error);
  }
};

export default updateBanner;
