import QuickOrder from "../../models/QuickOrder.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getSingleQuickOrder = async (
  req,
  res,
  next
) => {
  try {
    const order = await QuickOrder.findById(req.params.id)
      .populate(
        "tradeUser"
      )
      .populate("reviewedBy", "name email");

    if (!order) {
      return next(
        new ApiError(404, "Quick order not found.")
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Quick order fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSingleQuickOrder;