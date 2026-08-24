import SampleOrder from "../../models/SampleOrder.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateSampleStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await SampleOrder.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, "Sample order not found."));
    }

    order.status = status;
    order.reviewedBy = req.user._id;
    order.reviewedAt = new Date();

    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Status updated successfully."));
  } catch (error) {
    next(error);
  }
};

export default updateSampleStatus;
