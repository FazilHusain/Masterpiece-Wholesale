import SampleOrder from "../../models/SampleOrder.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateSampleOrder = async (req, res, next) => {
  try {
    const order = await SampleOrder.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, "Sample order not found."));
    }

    const {
      customerName,
      companyName,
      email,
      phone,
      country,
      shippingAddress,
      city,
      state,
      postalCode,
      message,
      adminNote,
      status,
    } = req.body;

    // Customer details
    order.customerName = customerName ?? order.customerName;
    order.companyName = companyName ?? order.companyName;
    order.email = email ?? order.email;
    order.phone = phone ?? order.phone;
    order.country = country ?? order.country;

    // Shipping details
    order.shippingAddress =
      shippingAddress ?? order.shippingAddress;
    order.city = city ?? order.city;
    order.state = state ?? order.state;
    order.postalCode = postalCode ?? order.postalCode;

    // Customer message and admin note
    order.message = message ?? order.message;
    order.adminNote = adminNote ?? order.adminNote;

    // Validate status before updating
    if (status !== undefined) {
      const allowedStatuses = [
        "Pending",
        "Approved",
        "Rejected",
        "Packed",
        "Shipped",
        "Delivered",
      ];

      if (!allowedStatuses.includes(status)) {
        return next(
          new ApiError(400, "Invalid sample order status.")
        );
      }

      order.status = status;
    }

    // Keep existing product/items and payment data unchanged.
    if (req.admin?._id) {
      order.reviewedBy = req.admin._id;
    }

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