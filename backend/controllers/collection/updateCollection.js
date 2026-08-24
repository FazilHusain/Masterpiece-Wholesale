import Collection from "../../models/Collection.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";
import processImage from "../../utils/imageProcessor.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateCollection = async (req, res, next) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);

    if (!collection) {
      return next(new ApiError(404, "Collection not found."));
    }

    const {
      name,
      shortDescription,
      description,
      storyTitle,
      storyDescription,
      storyVideo,
      metaTitle,
      metaDescription,
      keywords,
      isFeatured,
      showOnHomepage,
      isActive,
      displayOrder,
    } = req.body;

    // -----------------------------
    // Basic fields
    // -----------------------------

    if (name?.trim() && name.trim() !== collection.name) {
      collection.name = name.trim();

      collection.slug = await generateUniqueSlug(
        Collection,
        name.trim(),
        collection._id,
      );
    }

    collection.shortDescription =
      shortDescription ?? collection.shortDescription;

    collection.description = description ?? collection.description;

    collection.storyTitle = storyTitle ?? collection.storyTitle;

    collection.storyDescription =
      storyDescription ?? collection.storyDescription;

    collection.storyVideo = storyVideo ?? collection.storyVideo;

    collection.metaTitle = metaTitle ?? collection.metaTitle;

    collection.metaDescription = metaDescription ?? collection.metaDescription;

    // -----------------------------
    // Keywords
    // -----------------------------

    if (keywords !== undefined) {
      collection.keywords = Array.isArray(keywords)
        ? keywords
        : typeof keywords === "string"
          ? keywords
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : collection.keywords;
    }

    // -----------------------------
    // Boolean fields
    // -----------------------------

    if (isFeatured !== undefined) {
      collection.isFeatured = isFeatured === true || isFeatured === "true";
    }

    if (showOnHomepage !== undefined) {
      collection.showOnHomepage =
        showOnHomepage === true || showOnHomepage === "true";
    }

    if (isActive !== undefined) {
      collection.isActive = isActive === true || isActive === "true";
    }

    // -----------------------------
    // Display Order
    // -----------------------------

    if (displayOrder !== undefined) {
      collection.displayOrder = Number(displayOrder) || 0;
    }

    // -----------------------------
    // Images
    // -----------------------------
    console.log("🔥 FILES RECEIVED:", req.files);

    const files = req.files || {};

    // Banner
    if (files.bannerImage?.[0]) {
      const imageUrl = await processImage(
        files.bannerImage[0],
        "collections/banner",
      );

      collection.bannerImage = imageUrl;
    }

    // Thumbnail
    if (files.thumbnailImage?.[0]) {
      const imageUrl = await processImage(
        files.thumbnailImage[0],
        "collections/thumbnail",
      );

      collection.thumbnailImage = imageUrl;
    }

    // Featured
    if (files.featuredImage?.[0]) {
      const imageUrl = await processImage(
        files.featuredImage[0],
        "collections/featured",
      );

      collection.featuredImage = imageUrl;
    }

    // -----------------------------
    // Save
    // -----------------------------

    await collection.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, collection, "Collection updated successfully."),
      );
  } catch (error) {
    next(error);
  }
};

export default updateCollection;
