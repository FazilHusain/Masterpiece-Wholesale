import SampleOrder from "../../models/SampleOrder.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getMySampleOrders = async (req, res, next) => {
  try {
    const orders = await SampleOrder.find({
      tradeUser: req.user._id,
    })
      .populate("product", "name sku featuredImage")
      .sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        orders,
        "My sample orders fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getMySampleOrders;