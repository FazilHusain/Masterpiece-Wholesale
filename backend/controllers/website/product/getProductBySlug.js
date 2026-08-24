import Product from "../../../models/Product.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug,
      isActive: true,
      visibility: {
        $in: ["both", "customer"],
      },
    })
      .populate("collection", "name slug")
      .populate("category", "name slug");

    if (!product) {
      return res.status(404).json(
        new ApiResponse(
          404,
          null,
          "Product not found."
        )
      );
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

export default getProductBySlug;