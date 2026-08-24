import Product from "../../models/Product.js";
import WholesaleApplication from "../../models/WholesaleApplication.js";
import Journal from "../../models/Journal.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getDashboardRecent = async (req, res, next) => {
  try {
    const [
      recentProducts,
      recentTradeRequests,
      recentJournal,
    ] = await Promise.all([
      Product.find()
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .limit(4)
        .select("name thumbnail isActive category")
        .lean(),

      WholesaleApplication.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .select("businessName country status")
        .lean(),

      Journal.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("title category featuredImage createdAt")
        .lean(),
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          recentProducts,
          recentTradeRequests,
          recentJournal,
        },
        "Dashboard recent activity fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getDashboardRecent;