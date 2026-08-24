import Banner from "../../models/Banner.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteBanner = async (
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

    await banner.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Banner deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteBanner;