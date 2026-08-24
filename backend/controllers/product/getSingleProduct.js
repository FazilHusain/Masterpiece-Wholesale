import Product from "../../models/Product.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("collection", "name slug")
      .populate("category", "name slug")
      .populate("relatedProducts", "name slug featuredImage");

    if (!product) {
      return next(new ApiError(404, "Product not found."));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        product,
        "Product fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSingleProduct;