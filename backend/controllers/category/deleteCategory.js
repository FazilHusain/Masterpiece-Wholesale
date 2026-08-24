import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return next(new ApiError(404, "Category not found."));
    }

    const productCount = await Product.countDocuments({
      category: id,
    });

    if (productCount > 0) {
      return next(
        new ApiError(
          400,
          "Cannot delete category. Products are assigned to this category."
        )
      );
    }

    const childCategoryCount = await Category.countDocuments({
      parentCategory: id,
    });

    if (childCategoryCount > 0) {
      return next(
        new ApiError(
          400,
          "Cannot delete category. Child categories exist."
        )
      );
    }

    await category.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Category deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteCategory;