import SampleOrder from "../../models/SampleOrder.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getSampleOrders = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          companyName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          orderNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total =
      await SampleOrder.countDocuments(query);

    const orders = await SampleOrder.find(query)
      .populate(
        "product",
        "name sku featuredImage"
      )
      .populate(
        "reviewedBy",
        "firstName lastName"
      )
      .sort({
        createdAt: -1,
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          orders,
          pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(
              total / Number(limit)
            ),
            totalItems: total,
            limit: Number(limit),
          },
        },
        "Sample orders fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSampleOrders;