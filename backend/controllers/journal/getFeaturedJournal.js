import Journal from "../../models/Journal.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getFeaturedJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findOne({
      isFeatured: true,
      isActive: true,
    }).sort({
      displayOrder: 1,
      publishedAt: -1,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        journal,
        "Featured journal fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getFeaturedJournal;