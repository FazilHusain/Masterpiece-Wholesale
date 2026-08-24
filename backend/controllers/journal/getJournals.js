import Journal from "../../models/Journal.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getJournals = async (req, res, next) => {
  try {
    const journals = await Journal.find({
      isActive: true,
    }).sort({
      displayOrder: 1,
      publishedAt: -1,
      createdAt: -1,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, journals, "Journals fetched successfully."));
  } catch (error) {
    next(error);
  }
};

export default getJournals;
