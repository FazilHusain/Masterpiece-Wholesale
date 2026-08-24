import Collection from "../../../models/Collection.js";
import Category from "../../../models/Category.js";
import Product from "../../../models/Product.js";

import ApiResponse from "../../../utils/ApiResponse.js";

const getHomePage = async (req, res, next) => {
  try {
    const [
      heroCollections,
      featuredCollections,
      featuredCategories,
      featuredProducts,
      newArrivals,
      bestSellers,
    ] = await Promise.all([
      Collection.find({
        isActive: true,
        showOnHomepage: true,
      })
        .sort({ displayOrder: 1 })
        .select(
          "name slug bannerImage thumbnailImage featuredImage shortDescription"
        ),

      Collection.find({
        isActive: true,
        isFeatured: true,
      })
        .sort({ displayOrder: 1 })
        .select(
          "name slug featuredImage thumbnailImage shortDescription"
        ),

      Category.find({
        isActive: true,
        isFeatured: true,
      })
        .populate("collection", "name slug")
        .sort({ displayOrder: 1 })
        .select(
          "name slug image bannerImage collection"
        ),

      Product.find({
        isActive: true,
        isFeatured: true,
        visibility: { $in: ["both", "customer"] },
      })
        .populate("collection", "name slug")
        .populate("category", "name slug")
        .limit(8),

      Product.find({
        isActive: true,
        isNewArrival: true,
        visibility: { $in: ["both", "customer"] },
      })
        .populate("collection", "name slug")
        .populate("category", "name slug")
        .limit(8),

      Product.find({
        isActive: true,
        isBestSeller: true,
        visibility: { $in: ["both", "customer"] },
      })
        .populate("collection", "name slug")
        .populate("category", "name slug")
        .limit(8),
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          heroCollections,
          featuredCollections,
          featuredCategories,
          featuredProducts,
          newArrivals,
          bestSellers,
        },
        "Homepage data fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getHomePage;