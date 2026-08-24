import Journal from "../../models/Journal.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";

const createJournal = async (req, res, next) => {
  try {
    const {
      title,
      category,
      shortDescription,
      content,
      author,
      metaTitle,
      metaDescription,
      metaKeywords,
      isFeatured,
      isActive,
      displayOrder,
      publishedAt,
    } = req.body;

    /* ==========================
       Required Fields
    ========================== */

    if (!title) {
      return next(new ApiError(400, "Journal title is required."));
    }

    if (!category) {
      return next(new ApiError(400, "Journal category is required."));
    }

    /* ==========================
       Slug
    ========================== */

    const slug = await generateUniqueSlug(
      Journal,
      title
    );

    /* ==========================
       Meta Keywords
    ========================== */

    const keywords = Array.isArray(metaKeywords)
      ? metaKeywords
      : typeof metaKeywords === "string"
      ? metaKeywords
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    /* ==========================
       Create Journal
    ========================== */

    const journal = await Journal.create({
      title,
      slug,

      category,

      shortDescription,
      content,

      author,

      metaTitle,
      metaDescription,
      metaKeywords: keywords,

      isFeatured,

      isActive,

      displayOrder,

      publishedAt,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        journal,
        "Journal created successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default createJournal;