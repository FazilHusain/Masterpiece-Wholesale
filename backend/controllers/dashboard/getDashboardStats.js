import Product from "../../models/Product.js";
import Collection from "../../models/Collection.js";
import Category from "../../models/Category.js";
import WholesaleApplication from "../../models/WholesaleApplication.js";
import Journal from "../../models/Journal.js";
import SampleOrder from "../../models/SampleOrder.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getDashboardStats = async (req, res, next) => {
  try {
    const [
      productCount,
      collectionCount,
      categoryCount,
      tradeRequestCount,
      journalCount,
      sampleOrderCount,
    ] = await Promise.all([
      Product.countDocuments(),
      Collection.countDocuments(),
      Category.countDocuments(),
      WholesaleApplication.countDocuments(),
      Journal.countDocuments(),
      SampleOrder.countDocuments(),
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          products: productCount,
          collections: collectionCount,
          categories: categoryCount,
          tradeRequests: tradeRequestCount,
          journal: journalCount,
          sampleOrders: sampleOrderCount,
        },
        "Dashboard stats fetched successfully.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default getDashboardStats;
