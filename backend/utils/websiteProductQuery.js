import Product from "../models/Product.js";

const websiteProductQuery = (filter = {}) => {
  return Product.find({
    isActive: true,
    visibility: { $in: ["both", "customer"] },
    ...filter,
  })
    .select(
      `
      name
      slug
      sku
      featuredImage
      shortDescription
      variants
      isFeatured
      isBestSeller
      isNew
      `
    )
    .populate("collection", "name slug")
    .populate("category", "name slug")
    .sort({
      displayOrder: 1,
      createdAt: -1,
    });
};

export default websiteProductQuery;