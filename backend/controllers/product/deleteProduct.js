import Product from "../../models/Product.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError(404, "Product not found."));
    }

    await product.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Product deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteProduct;