import Product from "../../models/Product.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("collection", "name slug")
      .populate("category", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        products,
        "Products fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getProducts;