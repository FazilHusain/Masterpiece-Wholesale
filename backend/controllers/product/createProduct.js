import Product from "../../models/Product.js";
import Collection from "../../models/Collection.js";
import Category from "../../models/Category.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";
import processImage from "../../utils/imageProcessor.js";

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      sku,

      shortDescription,
      description,

      collection,
      category,

      material,
      pattern,
      colorFamily,
      hsCode,
      countryOfOrigin,
      leadTime,
      careInstructions,

      metaTitle,
      metaDescription,

      tags,

      // =========================
      // STRUCTURED DATA
      // =========================

      storySections,
      sample,
      variants,
      downloads,
      searchKeywords,
      relatedProducts,

      // =========================
      // SETTINGS
      // =========================

      isFeatured,
      isBestSeller,
      isNew,

      visibility,

      isActive,

      displayOrder,
    } = req.body || {};

    // ==========================
    // Required Fields
    // ==========================

    if (!name) {
      return next(
        new ApiError(
          400,
          "Product name is required."
        )
      );
    }

    if (!sku) {
      return next(
        new ApiError(
          400,
          "Product SKU is required."
        )
      );
    }

    if (!collection) {
      return next(
        new ApiError(
          400,
          "Collection is required."
        )
      );
    }

    if (!category) {
      return next(
        new ApiError(
          400,
          "Category is required."
        )
      );
    }

    // ==========================
    // Featured Image
    // ==========================

    if (!req.file) {
      return next(
        new ApiError(
          400,
          "Featured product image is required."
        )
      );
    }

    // ==========================
    // Collection Validation
    // ==========================

    const collectionExists =
      await Collection.findById(collection);

    if (!collectionExists) {
      return next(
        new ApiError(
          404,
          "Collection not found."
        )
      );
    }

    // ==========================
    // Category Validation
    // ==========================

    const categoryExists =
      await Category.findById(category);

    if (!categoryExists) {
      return next(
        new ApiError(
          404,
          "Category not found."
        )
      );
    }

    // ==========================
    // SKU Validation
    // ==========================

    const skuExists =
      await Product.findOne({ sku });

    if (skuExists) {
      return next(
        new ApiError(
          409,
          "SKU already exists."
        )
      );
    }

    // ==========================
    // Slug
    // ==========================

    const slug =
      await generateUniqueSlug(
        Product,
        name
      );

    // ==========================
    // Tags
    // ==========================

    const tagArray = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
        ? tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    // ==========================
    // Story Sections
    // ==========================

    let parsedStorySections = [];

    if (storySections !== undefined) {
      try {
        const parsed =
          typeof storySections === "string"
            ? JSON.parse(storySections)
            : storySections;

        if (Array.isArray(parsed)) {
          parsedStorySections = parsed.map(
            (story, index) => ({
              title: story.title || "",

              description:
                story.description || "",

              // Image will be uploaded
              // separately after product creation
              image: story.image || "",

              sortOrder:
                story.sortOrder !== undefined
                  ? Number(story.sortOrder)
                  : index,
            })
          );
        }
      } catch (error) {
        return next(
          new ApiError(
            400,
            "Invalid story sections data."
          )
        );
      }
    }

    // ==========================
    // Sample
    // ==========================

    let parsedSample = undefined;

    if (sample !== undefined) {
      try {
        parsedSample =
          typeof sample === "string"
            ? JSON.parse(sample)
            : sample;
      } catch (error) {
        return next(
          new ApiError(
            400,
            "Invalid sample data."
          )
        );
      }
    }

    // ==========================
    // Variants
    // ==========================

    let parsedVariants = [];

    if (variants !== undefined) {
      try {
        const parsed =
          typeof variants === "string"
            ? JSON.parse(variants)
            : variants;

        if (Array.isArray(parsed)) {
          parsedVariants = parsed;
        }
      } catch (error) {
        return next(
          new ApiError(
            400,
            "Invalid variants data."
          )
        );
      }
    }

    // ==========================
    // Downloads
    // ==========================

    let parsedDownloads = [];

    if (downloads !== undefined) {
      try {
        const parsed =
          typeof downloads === "string"
            ? JSON.parse(downloads)
            : downloads;

        if (Array.isArray(parsed)) {
          parsedDownloads = parsed;
        }
      } catch (error) {
        return next(
          new ApiError(
            400,
            "Invalid downloads data."
          )
        );
      }
    }

    // ==========================
    // Search Keywords
    // ==========================

    let parsedSearchKeywords = [];

    if (searchKeywords !== undefined) {
      try {
        const parsed =
          typeof searchKeywords === "string"
            ? JSON.parse(searchKeywords)
            : searchKeywords;

        if (Array.isArray(parsed)) {
          parsedSearchKeywords = parsed;
        }
      } catch (error) {
        return next(
          new ApiError(
            400,
            "Invalid search keywords."
          )
        );
      }
    }

    // ==========================
    // Related Products
    // ==========================

    let parsedRelatedProducts = [];

    if (relatedProducts !== undefined) {
      try {
        const parsed =
          typeof relatedProducts === "string"
            ? JSON.parse(relatedProducts)
            : relatedProducts;

        if (Array.isArray(parsed)) {
          parsedRelatedProducts = parsed;
        }
      } catch (error) {
        return next(
          new ApiError(
            400,
            "Invalid related products."
          )
        );
      }
    }

    // ==========================
    // Featured Image Upload
    // ==========================

    const featuredImage =
      await processImage(
        req.file,
        "products"
      );

    // ==========================
    // Create Product
    // ==========================

    const product =
      await Product.create({
        name,
        slug,
        sku,

        shortDescription,
        description,

        collection,
        category,

        material,
        pattern,
        colorFamily,
        hsCode,
        countryOfOrigin,
        leadTime,
        careInstructions,

        featuredImage,

        metaTitle,
        metaDescription,

        tags: tagArray,

        // =========================
        // STRUCTURED DATA
        // =========================

        storySections:
          parsedStorySections,

        sample:
          parsedSample,

        variants:
          parsedVariants,

        downloads:
          parsedDownloads,

        searchKeywords:
          parsedSearchKeywords,

        relatedProducts:
          parsedRelatedProducts,

        // =========================
        // SETTINGS
        // =========================

        isFeatured:
          isFeatured === true ||
          isFeatured === "true",

        isBestSeller:
          isBestSeller === true ||
          isBestSeller === "true",

        isNew:
          isNew === true ||
          isNew === "true",

        visibility:
          visibility || "both",

        isActive:
          isActive === undefined
            ? true
            : isActive === true ||
              isActive === "true",

        displayOrder:
          Number(displayOrder) || 0,
      });

    // ==========================
    // Response
    // ==========================

    return res.status(201).json(
      new ApiResponse(
        201,
        product,
        "Product created successfully."
      )
    );

  } catch (error) {
    next(error);
  }
};

export default createProduct;