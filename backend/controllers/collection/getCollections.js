import Collection from "../../models/Collection.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find()
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        collections,
        "Collections fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getCollections;