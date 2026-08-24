import Journal from "../../models/Journal.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getRelatedJournals = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const currentJournal = await Journal.findOne({ slug });

    if (!currentJournal) {
      return next(new ApiError(404, "Journal not found."));
    }

    const journals = await Journal.find({
      category: currentJournal.category,
      isActive: true,
      _id: { $ne: currentJournal._id },
    })
      .sort({
        publishedAt: -1,
      })
      .limit(3);

    return res.status(200).json(
      new ApiResponse(
        200,
        journals,
        "Related journals fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getRelatedJournals;