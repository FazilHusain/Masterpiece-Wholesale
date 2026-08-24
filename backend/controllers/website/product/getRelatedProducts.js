import Product from "../../../models/Product.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getRelatedProducts = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const currentProduct = await Product.findOne({
      slug,
    });

    if (!currentProduct) {
      return res.status(200).json(
        new ApiResponse(
          200,
          [],
          "Related products fetched successfully."
        )
      );
    }

    let products = [];

    if (currentProduct.relatedProducts.length) {
      products = await Product.find({
        _id: {
          $in: currentProduct.relatedProducts,
        },
        isActive: true,
      })
        .select(
          "name slug featuredImage shortDescription"
        )
        .limit(8);
    } else {
      products = await Product.find({
        _id: {
          $ne: currentProduct._id,
        },
        category: currentProduct.category,
        isActive: true,
        visibility: {
          $in: ["both", "customer"],
        },
      })
        .select(
          "name slug featuredImage shortDescription"
        )
        .sort({
          isFeatured: -1,
          createdAt: -1,
        })
        .limit(8);
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        products,
        "Related products fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getRelatedProducts;