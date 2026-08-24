import Admin from "../../models/Admin.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getAdmins = async (req, res, next) => {
  try {
    const {
      search = "",
      role,
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    // Search
    if (search.trim()) {
      query.$or = [
        {
          name: {
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
      ];
    }

    // Role Filter
    if (role) {
      query.role = role;
    }

    // Status Filter
    if (status !== undefined) {
      query.isActive = status === "true";
    }

    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const total = await Admin.countDocuments(query);

    const admins = await Admin.find(query)
      .select("-password -otpCode -otpExpiresAt")
      .sort(sort)
      .skip(skip)
      .limit(perPage);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          admins,
          pagination: {
            total,
            page: currentPage,
            limit: perPage,
            totalPages: Math.ceil(total / perPage),
          },
        },
        "Admins fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getAdmins;