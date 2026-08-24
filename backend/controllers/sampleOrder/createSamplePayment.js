import SampleOrder from "../../models/SampleOrder.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createSamplePayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ApiError(400, "Sample order ID is required."));
    }

    const order = await SampleOrder.findById(id);

    if (!order) {
      return next(new ApiError(404, "Sample order not found."));
    }

    if (order.paymentStatus === "Paid") {
      return next(
        new ApiError(400, "This sample order has already been paid."),
      );
    }

    if (!order.grandTotal || order.grandTotal <= 0) {
      return next(
        new ApiError(400, "Invalid payment amount."),
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          orderId: order._id,
          orderNumber: order.orderNumber,
          amount: order.grandTotal,
          currency: order.currency,
          paymentStatus: order.paymentStatus,
          paymentGateway: order.paymentGateway,
        },
        "Sample payment initialized.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default createSamplePayment;