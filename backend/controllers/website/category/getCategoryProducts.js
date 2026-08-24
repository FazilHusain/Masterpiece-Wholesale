import Category from "../../../models/Category.js";
import Product from "../../../models/Product.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getCategoryProducts = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      slug,
      isActive: true,
    }).populate("collection", "name slug");

    if (!category) {
      return next(new ApiError(404, "Category not found."));
    }

    const products = await Product.find({
      category: category._id,
      isActive: true,
      visibility: {
        $in: ["both", "customer"],
      },
    })
      .populate("collection", "name slug")
      .populate("category", "name slug")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          category,
          collection: category.collection,
          products,
        },
        "Category products fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getCategoryProducts;