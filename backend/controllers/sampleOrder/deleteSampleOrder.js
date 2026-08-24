import SampleOrder from "../../models/SampleOrder.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const deleteSampleOrder = async (
  req,
  res,
  next
) => {
  try {
    const order =
      await SampleOrder.findById(
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

    await order.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Sample order deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default deleteSampleOrder;