import Collection from "../../../models/Collection.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import ApiError from "../../../utils/ApiError.js";

const getCollectionBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const collection = await Collection.findOne({
      slug,
      isActive: true,
    });

    if (!collection) {
      return next(new ApiError(404, "Collection not found."));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        collection,
        "Collection fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getCollectionBySlug;