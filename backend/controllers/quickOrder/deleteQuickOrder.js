import QuickOrder from "../../models/QuickOrder.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteQuickOrder = async (
  req,
  res,
  next
) => {
  try {
    const order = await QuickOrder.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, "Quick order not found."));
    }

    await order.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Quick order deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteQuickOrder;