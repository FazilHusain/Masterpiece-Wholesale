import SampleOrder from "../../models/SampleOrder.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getSingleSampleOrder = async (req, res, next) => {
  try {
    const order = await SampleOrder.findById(req.params.id)
      .populate("product", "name sku featuredImage")
      .populate("reviewedBy", "firstName lastName email")

      .populate(
        "tradeUser",
        "firstName lastName email phone businessName addresses",
      );

    if (!order) {
      return next(new ApiError(404, "Sample order not found."));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Sample order fetched successfully."));
  } catch (error) {
    next(error);
  }
};

export default getSingleSampleOrder;
