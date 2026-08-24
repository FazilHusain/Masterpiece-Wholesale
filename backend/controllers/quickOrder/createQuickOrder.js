import QuickOrder from "../../models/QuickOrder.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import generateQuickOrderNumber from "../../utils/generateQuickOrderNumber.js";

const createQuickOrder = async (req, res, next) => {
  try {
    const { orderItems, notes = "" } = req.body;

    if (!orderItems?.trim()) {
      return next(new ApiError(400, "Order items are required."));
    }

    const user = req.user;

    const orderNumber = await generateQuickOrderNumber();

    const order = await QuickOrder.create({
      orderNumber,

      customerName: `${user.firstName} ${user.lastName}`.trim(),

      companyName: user.businessName || "",

      email: user.email,

      phone: user.phone,

      country: user.country || "",

      // agar model me hai to rehne do
      tradeUser: user._id,

      orderItems,

      notes,
    });

    /*
  TODO

  await sendQuickOrderAdminMail(order);

  await sendQuickOrderCustomerMail(order);
*/

    return res
      .status(201)
      .json(new ApiResponse(201, order, "Quick order submitted successfully."));
  } catch (error) {
    next(error);
  }
};

export default createQuickOrder;
