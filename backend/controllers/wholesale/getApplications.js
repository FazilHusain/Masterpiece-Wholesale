import WholesaleApplication from "../../models/WholesaleApplication.js";

import ApiResponse from "../../utils/ApiResponse.js";
import pagination from "../../utils/pagination.js";

const getApplications = async (req, res, next) => {
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
          applicationNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          businessName: {
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
          firstName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const {
      skip,
      limit: pageLimit,
      currentPage,
    } = pagination(page, limit);

    const totalDocuments =
      await WholesaleApplication.countDocuments(query);

    const applications =
      await WholesaleApplication.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          applications,
          pagination: {
            currentPage,
            totalPages: Math.ceil(
              totalDocuments / pageLimit
            ),
            totalDocuments,
            limit: pageLimit,
          },
        },
        "Applications fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getApplications;