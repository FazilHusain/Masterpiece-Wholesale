import SampleOrder from "../../models/SampleOrder.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateSampleOrder = async (
  req,
  res,
  next
) => {
  try {
    const order = await SampleOrder.findById(
      req.params.id
    );

    if (!order) {
      return next(
        new ApiError(
          404,
          "Sample order not found."
        )
      );
    }

    const {
      customerName,
      companyName,
      email,
      phone,
      country,

      product,
      variant,
      sku,
      quantity,

      shippingAddress,
      city,
      state,
      postalCode,

      message,
    } = req.body;

    order.customerName =
      customerName ?? order.customerName;

    order.companyName =
      companyName ?? order.companyName;

    order.email =
      email ?? order.email;

    order.phone =
      phone ?? order.phone;

    order.country =
      country ?? order.country;

    order.product =
      product ?? order.product;

    order.variant =
      variant ?? order.variant;

    order.sku =
      sku ?? order.sku;

    order.quantity =
      quantity ?? order.quantity;

    order.shippingAddress =
      shippingAddress ??
      order.shippingAddress;

    order.city =
      city ?? order.city;

    order.state =
      state ?? order.state;

    order.postalCode =
      postalCode ??
      order.postalCode;

    order.message =
      message ?? order.message;

    order.reviewedBy = req.admin._id;
    order.reviewedAt = new Date();

    await order.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Sample order updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default updateSampleOrder;