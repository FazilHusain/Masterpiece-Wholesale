import Banner from "../../models/Banner.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getWebsiteBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({
      isActive: true,
      page: "Home",
      type: "Hero",
    })
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(
      new ApiResponse(
        200,
        banners,
        "Website banners fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getWebsiteBanners;