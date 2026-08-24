import Banner from "../../models/Banner.js";

import ApiResponse from "../../utils/ApiResponse.js";
import pagination from "../../utils/pagination.js";

const getBanners = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      type,
    } = req.query;

    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const total =
      await Banner.countDocuments(filter);

    const banners =
      await Banner.find(filter)
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          banners,

          pagination: pagination(
            total,
            Number(page),
            Number(limit)
          ),
        },
        "Banners fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getBanners;