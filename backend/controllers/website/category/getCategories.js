import Category from "../../../models/Category.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getCategories = async (req, res, next) => {
  try {
    const { collection } = req.query;

    const filter = {
      isActive: true,
    };

    if (collection) {
      filter.collection = collection;
    }

    const categories = await Category.find(filter)
      .populate("collection", "name slug")
      .select(
        "name slug description image bannerImage collection isFeatured displayOrder"
      )
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        categories,
        "Categories fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getCategories;