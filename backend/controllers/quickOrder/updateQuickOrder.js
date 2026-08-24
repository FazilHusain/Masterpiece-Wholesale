import QuickOrder from "../../models/QuickOrder.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateQuickOrder = async (req, res, next) => {
  try {
    const { orderItems, notes } = req.body;

    const order = await QuickOrder.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, "Quick order not found."));
    }

    if (orderItems !== undefined) {
      order.orderItems = orderItems;
    }

    if (notes !== undefined) {
      order.notes = notes;
    }

    await order.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Quick order updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default updateQuickOrder;