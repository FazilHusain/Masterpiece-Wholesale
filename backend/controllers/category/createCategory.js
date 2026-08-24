import Category from "../../models/Category.js";
import Collection from "../../models/Collection.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";
import processImage from "../../utils/imageProcessor.js";

const createCategory = async (req, res, next) => {
  try {
    const {
      name,
      description,
      collection,
      parentCategory,
      displayOrder,
      isFeatured,
      isActive,
      metaTitle,
      metaDescription,
    } = req.body;

    // =============================
    // BASIC VALIDATION
    // =============================

    if (!name) {
      return next(
        new ApiError(400, "Category name is required.")
      );
    }

    if (!collection) {
      return next(
        new ApiError(400, "Collection is required.")
      );
    }

    // =============================
    // COLLECTION CHECK
    // =============================

    const collectionExists =
      await Collection.findById(collection);

    if (!collectionExists) {
      return next(
        new ApiError(404, "Collection not found.")
      );
    }

    // =============================
    // SLUG
    // =============================

    const slug = await generateUniqueSlug(
      Category,
      name
    );

    // =============================
    // IMAGES
    // =============================

    const files = req.files || {};

    let image = "";
    let bannerImage = "";

    // Category Image
    if (files.image?.[0]) {
      image = await processImage(
        files.image[0],
        "categories/image"
      );
    }

    // Category Banner
    if (files.bannerImage?.[0]) {
      bannerImage = await processImage(
        files.bannerImage[0],
        "categories/banner"
      );
    }

    // =============================
    // CREATE CATEGORY
    // =============================

    const category = await Category.create({
      name,
      slug,
      description,

      image,
      bannerImage,

      collection,
      parentCategory: parentCategory || null,

      displayOrder:
        Number(displayOrder) || 0,

      isFeatured:
        isFeatured === true ||
        isFeatured === "true",

      isActive:
        isActive === undefined
          ? true
          : isActive === true ||
            isActive === "true",

      metaTitle,
      metaDescription,
    });

    // =============================
    // RESPONSE
    // =============================

    return res.status(201).json(
      new ApiResponse(
        201,
        category,
        "Category created successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default createCategory;