import Category from "../../models/Category.js";
import Collection from "../../models/Collection.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";
import processImage from "../../utils/imageProcessor.js";

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return next(
        new ApiError(404, "Category not found.")
      );
    }

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
    // COLLECTION
    // =============================

    if (collection) {
      const collectionExists =
        await Collection.findById(collection);

      if (!collectionExists) {
        return next(
          new ApiError(404, "Collection not found.")
        );
      }

      category.collection = collection;
    }

    // =============================
    // BASIC FIELDS
    // =============================

    if (
      name?.trim() &&
      name.trim() !== category.name
    ) {
      category.name = name.trim();

      category.slug = await generateUniqueSlug(
        Category,
        name.trim(),
        category._id
      );
    }

    category.description =
      description ?? category.description;

    category.parentCategory =
      parentCategory ?? category.parentCategory;

    category.displayOrder =
      displayOrder ?? category.displayOrder;

    // =============================
    // BOOLEAN FIELDS
    // =============================

    if (isFeatured !== undefined) {
      category.isFeatured =
        isFeatured === true ||
        isFeatured === "true";
    }

    if (isActive !== undefined) {
      category.isActive =
        isActive === true ||
        isActive === "true";
    }

    // =============================
    // SEO
    // =============================

    category.metaTitle =
      metaTitle ?? category.metaTitle;

    category.metaDescription =
      metaDescription ??
      category.metaDescription;

    // =============================
    // IMAGES
    // =============================

    const files = req.files || {};

    // Category Image
    if (files.image?.[0]) {
      category.image = await processImage(
        files.image[0],
        "categories/image"
      );
    }

    // Category Banner
    if (files.bannerImage?.[0]) {
      category.bannerImage = await processImage(
        files.bannerImage[0],
        "categories/banner"
      );
    }

    // =============================
    // SAVE
    // =============================

    await category.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        category,
        "Category updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default updateCategory;