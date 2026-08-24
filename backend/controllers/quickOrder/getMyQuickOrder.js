import QuickOrder from "../../models/QuickOrder.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getMyQuickOrders = async (req, res, next) => {
  try {
    const orders = await QuickOrder.find({
      tradeUser: req.user._id,
    }).sort({ createdAt: -1 });

    console.log("Orders =>", orders);

    return res
      .status(200)
      .json(
        new ApiResponse(200, orders, "My quick orders fetched successfully."),
      );
  } catch (error) {
    next(error);
  }
};

export default getMyQuickOrders;
