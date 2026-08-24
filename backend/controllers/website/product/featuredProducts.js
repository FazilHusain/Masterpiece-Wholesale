import ApiResponse from "../../../utils/ApiResponse.js";
import websiteProductQuery from "../../../utils/websiteProductQuery.js";

const featuredProducts = async (req, res, next) => {
  try {
    const products = await websiteProductQuery({
      isFeatured: true,
    }).limit(8);

    return res.status(200).json(
      new ApiResponse(
        200,
        products,
        "Featured products fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default featuredProducts;