import QuickOrder from "../../models/QuickOrder.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getQuickOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const {
      status,
      search,
      fromDate,
      toDate,
    } = req.query;

    const filter = {};

    /* Status */

    if (status) {
      filter.status = status;
    }

    /* Search */

    if (search) {
      filter.$or = [
        {
          orderNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          orderItems: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* Date */

    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        filter.createdAt.$gte = new Date(fromDate);
      }

      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = endDate;
      }
    }

    const total = await QuickOrder.countDocuments(filter);

    const orders = await QuickOrder.find(filter)
      .populate(
        "tradeUser",
        "firstName lastName businessName email phone country"
      )
      .populate("reviewedBy", "name email")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const counts = {
      total: await QuickOrder.countDocuments(),

      pending: await QuickOrder.countDocuments({
        status: "Pending",
      }),

      confirmed: await QuickOrder.countDocuments({
        status: "Confirmed",
      }),

      processing: await QuickOrder.countDocuments({
        status: "Processing",
      }),

      completed: await QuickOrder.countDocuments({
        status: "Completed",
      }),

      cancelled: await QuickOrder.countDocuments({
        status: "Cancelled",
      }),
    };

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          orders,
          counts,
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        "Quick orders fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getQuickOrders;