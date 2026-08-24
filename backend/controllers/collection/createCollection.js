import Collection from "../../models/Collection.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";
import processImage from "../../utils/imageProcessor.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

const createCollection = async (req, res, next) => {
  try {
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

    // Name validation
    if (!name?.trim()) {
      return next(
        new ApiError(400, "Collection name is required."),
      );
    }

    // Keywords
    const keywordsArray = Array.isArray(keywords)
      ? keywords
      : typeof keywords === "string"
        ? keywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    // Unique slug
    const slug = await generateUniqueSlug(
      Collection,
      name.trim(),
    );

    // Uploaded files
    const files = req.files || {};

    let bannerImage = "";
    let thumbnailImage = "";
    let featuredImage = "";

    // Banner
    if (files.bannerImage?.[0]) {
      bannerImage = await processImage(
        files.bannerImage[0],
        "collections/banner",
      );
    }

    // Thumbnail
    if (files.thumbnailImage?.[0]) {
      thumbnailImage = await processImage(
        files.thumbnailImage[0],
        "collections/thumbnail",
      );
    }

    // Featured
    if (files.featuredImage?.[0]) {
      featuredImage = await processImage(
        files.featuredImage[0],
        "collections/featured",
      );
    }

    const collection = await Collection.create({
      name: name.trim(),
      slug,

      shortDescription,
      description,

      // Cloudinary URLs
      bannerImage,
      thumbnailImage,
      featuredImage,

      storyTitle,
      storyDescription,
      storyVideo,

      metaTitle,
      metaDescription,

      keywords: keywordsArray,

      isFeatured:
        isFeatured === true ||
        isFeatured === "true",

      showOnHomepage:
        showOnHomepage === true ||
        showOnHomepage === "true",

      isActive:
        isActive !== false &&
        isActive !== "false",

      displayOrder:
        Number(displayOrder) || 0,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        collection,
        "Collection created successfully.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default createCollection;