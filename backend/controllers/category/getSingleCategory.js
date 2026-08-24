import Category from "../../models/Category.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

const getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id)
      .populate("collection", "name slug")
      .populate("parentCategory", "name slug");

    if (!category) {
      return next(new ApiError(404, "Category not found."));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        category,
        "Category fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSingleCategory;