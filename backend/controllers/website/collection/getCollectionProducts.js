import Collection from "../../../models/Collection.js";
import Product from "../../../models/Product.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import ApiError from "../../../utils/ApiError.js";

const getCollectionProducts = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const collection = await Collection.findOne({
      slug,
      isActive: true,
    });

    if (!collection) {
      return next(new ApiError(404, "Collection not found."));
    }

    const products = await Product.find({
      collection: collection._id,
      isActive: true,
      visibility: {
        $in: ["both", "customer"],
      },
    })
      .populate("category", "name slug")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          collection,
          products,
        },
        "Collection products fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getCollectionProducts;