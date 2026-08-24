import Collection from "../../models/Collection.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteCollection = async (req, res, next) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);

    if (!collection) {
      return next(new ApiError(404, "Collection not found."));
    }

    await collection.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Collection deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteCollection;