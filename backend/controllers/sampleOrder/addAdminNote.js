import SampleOrder from "../../models/SampleOrder.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const addAdminNote = async (req, res, next) => {
  try {
    const { adminNote } = req.body;

    const order = await SampleOrder.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, "Sample order not found."));
    }

    order.adminNote = adminNote;
    order.reviewedBy = req.user._id;
    order.reviewedAt = new Date();

    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Admin note updated successfully."));
  } catch (error) {
    next(error);
  }
};

export default addAdminNote;
