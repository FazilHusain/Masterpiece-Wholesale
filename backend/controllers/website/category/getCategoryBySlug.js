import Category from "../../../models/Category.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      slug,
      isActive: true,
    }).populate("collection", "name slug");

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

export default getCategoryBySlug;