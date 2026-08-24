import Contact from "../../models/Contact.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
    } = req.query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
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
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const totalDocuments =
      await Contact.countDocuments(query);

    const contacts = await Contact.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(
        (currentPage - 1) * pageLimit
      )
      .limit(pageLimit);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          contacts,
          pagination: {
            currentPage,
            totalPages: Math.ceil(
              totalDocuments / pageLimit
            ),
            totalDocuments,
            limit: pageLimit,
          },
        },
        "Contacts fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getContacts;