import SampleOrder from "../../models/SampleOrder.js";
import Product from "../../models/Product.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getSampleOrders = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
    } = req.query;

    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(limit) || 10));

    const query = {};

    if (status) {
      query.status = status;
    }

    const searchText = String(search).trim();

    if (searchText) {
      const escapedSearch = searchText.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const regex = new RegExp(escapedSearch, "i");

      // Search products by name or SKU
      const matchingProducts = await Product.find({
        $or: [
          { name: regex },
          { sku: regex },
        ],
      }).select("_id");

      const productIds = matchingProducts.map((product) => product._id);

      const searchConditions = [
        { customerName: regex },
        { companyName: regex },
        { email: regex },
        { phone: regex },
        { orderNumber: regex },
      ];

      if (productIds.length > 0) {
        searchConditions.push(
          { product: { $in: productIds } },
          { "items.product": { $in: productIds } }
        );
      }

      query.$or = searchConditions;
    }

    const total = await SampleOrder.countDocuments(query);

    const orders = await SampleOrder.find(query)
      .populate("product", "name sku featuredImage")
      .populate("items.product", "name sku featuredImage")
      .populate("reviewedBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          orders,
          pagination: {
            currentPage,
            totalPages: Math.ceil(total / pageSize),
            totalItems: total,
            limit: pageSize,
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