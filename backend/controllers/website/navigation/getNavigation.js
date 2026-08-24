import Collection from "../../../models/Collection.js";
import Category from "../../../models/Category.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const getNavigation = async (req, res, next) => {
  try {
    const [collections, categories] = await Promise.all([
      Collection.find({
        isActive: true,
      })
        .select("name slug displayOrder")
        .sort({
          displayOrder: 1,
          createdAt: -1,
        }),

      Category.find({
        isActive: true,
      })
        .select("name slug collection displayOrder")
        .populate("collection", "name slug")
        .sort({
          displayOrder: 1,
          createdAt: -1,
        }),
    ]);

    const quickLinks = [
      {
        label: "Wholesale",
        path: "/wholesale",
      },
      {
        label: "Trade Portal",
        path: "/trade",
      },
      {
        label: "Journal",
        path: "/journal",
      },
      {
        label: "Quick Order",
        path: "/quick-order",
      },
      {
        label: "Contact",
        path: "/contact",
      },
    ];

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          announcement: {
            title:
              "New Collection 2026 • Worldwide Shipping • Premium Luxury",
            buttonText: "View Catalogue",
            buttonLink: "/catalogue",
          },

          collections,

          categories,

          quickLinks,
        },
        "Navigation fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getNavigation;