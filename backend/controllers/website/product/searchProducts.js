import Product from "../../../models/Product.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const searchProducts = async (req, res, next) => {
  try {
    const { query = "" } = req.query;

    if (!query.trim()) {
      return res.status(200).json(
        new ApiResponse(
          200,
          [],
          "Products fetched successfully."
        )
      );
    }

    const searchRegex = new RegExp(query.trim(), "i");

    const products = await Product.find({
      isActive: true,
      visibility: { $in: ["both", "customer"] },
      $or: [
        { name: searchRegex },
        { tags: searchRegex },
        { searchKeywords: searchRegex },
      ],
    })
      .select(
        "name slug featuredImage shortDescription collection category"
      )
      .populate("collection", "name slug")
      .populate("category", "name slug")
      .sort({
        isFeatured: -1,
        displayOrder: 1,
        createdAt: -1,
      })
      .limit(10)
      .lean();

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

export default searchProducts;