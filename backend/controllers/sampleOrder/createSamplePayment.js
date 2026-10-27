import SampleOrder from "../../models/SampleOrder.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { initializePayGlocalPayment } from "../../services/email/payment/payglocal.service.js";

const createSamplePayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Validate order ID
    if (!id) {
      return next(
        new ApiError(400, "Sample order ID is required."),
      );
    }

    // 2. Fetch order and populate single/multiple products
    const order = await SampleOrder.findById(id)
      .populate("product", "name slug featuredImage images")
      .populate("variant", "size dimensions color sku price moq")
      .populate("items.product", "name slug featuredImage images")
      .populate("items.variant", "size dimensions color sku price moq");

    if (!order) {
      return next(
        new ApiError(404, "Sample order not found."),
      );
    }

    // 3. Prevent duplicate payment initialization for paid orders
    if (order.paymentStatus === "Paid") {
      return next(
        new ApiError(400, "This sample order has already been paid."),
      );
    }

    // 4. Use the saved server-side total
    const amount = Number(order.grandTotal);

    if (!Number.isFinite(amount) || amount <= 0) {
      return next(
        new ApiError(400, "Invalid payment amount."),
      );
    }

    // 5. Validate legacy single-product or new multi-product order
    const hasItems = Array.isArray(order.items) && order.items.length > 0;

    if (!hasItems && (!order.product || !order.variant)) {
      return next(
        new ApiError(
          400,
          "Sample product or variant is missing from this order.",
        ),
      );
    }

    if (
      hasItems &&
      order.items.some(
        (item) =>
          !item.product ||
          !Number.isFinite(Number(item.quantity)) ||
          Number(item.quantity) < 1 ||
          !Number.isFinite(Number(item.samplePrice)) ||
          Number(item.samplePrice) < 0
      )
    ) {
      return next(
        new ApiError(
          400,
          "One or more sample order items are incomplete.",
        ),
      );
    }

    // 6. Initialize payment using the saved order
    let payment;

    try {
      payment = await initializePayGlocalPayment({ order });
    } catch (error) {
      if (error?.code === "PAYGLOCAL_NOT_CONFIGURED") {
        return next(
          new ApiError(
            503,
            "PayGlocal payment gateway is not configured yet. Please try again once payment credentials are added.",
          ),
        );
      }

      throw error;
    }

    // 7. Return payment initialization details
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          orderId: order._id,
          orderNumber: order.orderNumber,
          amount,
          currency: order.currency || "USD",
          paymentStatus: order.paymentStatus,
          paymentGateway: order.paymentGateway || "PayGlocal",
          checkoutUrl: payment?.checkoutUrl || null,
          gatewayOrderId: payment?.gatewayOrderId || "",
          status: payment?.status || "Pending",
          provider: payment?.provider || "PayGlocal",
        },
        "Sample payment initialized.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default createSamplePayment;