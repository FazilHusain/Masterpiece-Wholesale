import Product from "../../models/Product.js";
import Collection from "../../models/Collection.js";
import Category from "../../models/Category.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";
import processImage from "../../utils/imageProcessor.js";
import removeFile from "../../utils/removeFile.js";

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError(404, "Product not found."));
    }

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

      isFeatured,
      isBestSeller,
      isNew,
      visibility,
      isActive,
      displayOrder,

      storySections,
      sample,
      variants,
      downloads,
      searchKeywords,
      relatedProducts,
    } = req.body;

    // ==========================
    // Collection
    // ==========================

    if (collection) {
      const exists = await Collection.findById(collection);

      if (!exists) {
        return next(new ApiError(404, "Collection not found."));
      }

      product.collection = collection;
    }

    // ==========================
    // Category
    // ==========================

    if (category) {
      const exists = await Category.findById(category);

      if (!exists) {
        return next(new ApiError(404, "Category not found."));
      }

      product.category = category;
    }

    // ==========================
    // Basic
    // ==========================

    if (name?.trim() && name.trim() !== product.name) {
      product.name = name.trim();

      product.slug = await generateUniqueSlug(
        Product,
        name.trim(),
        product._id,
      );
    }

    // ==========================
    // SKU
    // ==========================

    if (sku && sku !== product.sku) {
      const skuExists = await Product.findOne({
        sku,
        _id: { $ne: product._id },
      });

      if (skuExists) {
        return next(new ApiError(409, "SKU already exists."));
      }

      product.sku = sku;
    }

    product.shortDescription = shortDescription ?? product.shortDescription;

    product.description = description ?? product.description;

    product.material = material ?? product.material;

    product.pattern = pattern ?? product.pattern;

    product.colorFamily = colorFamily ?? product.colorFamily;

    product.hsCode = hsCode ?? product.hsCode;

    product.countryOfOrigin = countryOfOrigin ?? product.countryOfOrigin;

    product.leadTime = leadTime ?? product.leadTime;

    product.careInstructions = careInstructions ?? product.careInstructions;

    if (storySections !== undefined) {
      try {
        const parsedStory =
          typeof storySections === "string"
            ? JSON.parse(storySections)
            : storySections;

        if (Array.isArray(parsedStory)) {
          product.storySections = parsedStory.map((story, index) => {
            const oldStory = product.storySections?.[index];

            return {
              title: story.title ?? oldStory?.title ?? "",

              description: story.description ?? oldStory?.description ?? "",

              // IMPORTANT:
              // Agar frontend new image ke liye ""
              // bhej raha hai, old image preserve karo.
              image: story.image || oldStory?.image || "",

              sortOrder:
                story.sortOrder !== undefined
                  ? Number(story.sortOrder)
                  : (oldStory?.sortOrder ?? index),
            };
          });
        }
      } catch (error) {
        return next(new ApiError(400, "Invalid story sections data."));
      }
    }

    // ==========================
    // Sample
    // ==========================

    if (sample !== undefined) {
      try {
        const parsedSample =
          typeof sample === "string" ? JSON.parse(sample) : sample;

        product.sample = parsedSample;
      } catch (error) {
        return next(new ApiError(400, "Invalid sample data."));
      }
    }

    // ==========================
    // Variants
    // ==========================

    if (variants !== undefined) {
      try {
        const parsedVariants =
          typeof variants === "string" ? JSON.parse(variants) : variants;

        if (Array.isArray(parsedVariants)) {
          product.variants = parsedVariants;
        }
      } catch (error) {
        return next(new ApiError(400, "Invalid variants data."));
      }
    }

    // ==========================
    // Downloads
    // ==========================

    if (downloads !== undefined) {
      try {
        const parsedDownloads =
          typeof downloads === "string" ? JSON.parse(downloads) : downloads;

        if (Array.isArray(parsedDownloads)) {
          product.downloads = parsedDownloads;
        }
      } catch (error) {
        return next(new ApiError(400, "Invalid downloads data."));
      }
    }

    // ==========================
    // Search Keywords
    // ==========================

    if (searchKeywords !== undefined) {
      try {
        const parsedKeywords =
          typeof searchKeywords === "string"
            ? JSON.parse(searchKeywords)
            : searchKeywords;

        if (Array.isArray(parsedKeywords)) {
          product.searchKeywords = parsedKeywords;
        }
      } catch (error) {
        return next(new ApiError(400, "Invalid search keywords."));
      }
    }

    // ==========================
    // Related Products
    // ==========================

    if (relatedProducts !== undefined) {
      try {
        const parsedRelated =
          typeof relatedProducts === "string"
            ? JSON.parse(relatedProducts)
            : relatedProducts;

        if (Array.isArray(parsedRelated)) {
          product.relatedProducts = parsedRelated;
        }
      } catch (error) {
        return next(new ApiError(400, "Invalid related products."));
      }
    }

    product.metaTitle = metaTitle ?? product.metaTitle;

    product.metaDescription = metaDescription ?? product.metaDescription;

    // ==========================
    // Tags
    // ==========================

    product.tags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : product.tags;

    // ==========================
    // Booleans
    // ==========================

    if (isFeatured !== undefined) {
      product.isFeatured = isFeatured === true || isFeatured === "true";
    }

    if (isBestSeller !== undefined) {
      product.isBestSeller = isBestSeller === true || isBestSeller === "true";
    }

    if (isNew !== undefined) {
      product.isNew = isNew === true || isNew === "true";
    }

    product.visibility = visibility ?? product.visibility;

    if (isActive !== undefined) {
      product.isActive = isActive === true || isActive === "true";
    }

    if (displayOrder !== undefined) {
      product.displayOrder = Number(displayOrder) || 0;
    }

    // ==========================
    // Featured Image
    // ==========================

    if (req.file) {
      const oldImage = product.featuredImage;

      const newImage = await processImage(req.file, "products");

      product.featuredImage = newImage;

      if (oldImage) {
        try {
          await removeFile(oldImage);
        } catch (error) {
          console.log("Old product image removal failed:", error.message);
        }
      }
    }

    // ==========================
    // Save
    // ==========================

    await product.save();

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product updated successfully."));
  } catch (error) {
    next(error);
  }
};

export default updateProduct;
