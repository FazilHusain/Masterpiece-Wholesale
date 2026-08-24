import Banner from "../../models/Banner.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getSingleBanner = async (
  req,
  res,
  next
) => {
  try {
    const banner = await Banner.findById(
      req.params.id
    );

    if (!banner) {
      return next(
        new ApiError(
          404,
          "Banner not found."
        )
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        banner,
        "Banner fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSingleBanner;