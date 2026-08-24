import Category from "../../models/Category.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .populate("collection", "name slug")
      .populate("parentCategory", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        categories,
        "Categories fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getCategories;