import Product from "../../../models/Product.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import websiteProductQuery from "../../../utils/websiteProductQuery.js";

const bestSellerProducts = async (req, res, next) => {
  try {
    const products = await websiteProductQuery({
      isBestSeller: true,
    }).limit(8);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          products,
          "Best seller products fetched successfully.",
        ),
      );
  } catch (error) {
    next(error);
  }
};

export default bestSellerProducts;
