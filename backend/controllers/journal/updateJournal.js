import Journal from "../../models/Journal.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateUniqueSlug from "../../utils/generateUniqueSlug.js";

const updateJournal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const journal = await Journal.findById(id);

    if (!journal) {
      return next(new ApiError(404, "Journal not found."));
    }

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

    if (title) {
      journal.title = title;

      journal.slug = await generateUniqueSlug(
        Journal,
        title,
        journal._id,
      );
    }

    journal.category = category ?? journal.category;

    journal.shortDescription =
      shortDescription ?? journal.shortDescription;

    journal.content =
      content ?? journal.content;

    journal.author =
      author ?? journal.author;

    journal.metaTitle =
      metaTitle ?? journal.metaTitle;

    journal.metaDescription =
      metaDescription ?? journal.metaDescription;

    journal.metaKeywords = Array.isArray(metaKeywords)
      ? metaKeywords
      : typeof metaKeywords === "string"
        ? metaKeywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : journal.metaKeywords;

    journal.isFeatured =
      isFeatured ?? journal.isFeatured;

    journal.isActive =
      isActive ?? journal.isActive;

    journal.displayOrder =
      displayOrder ?? journal.displayOrder;

    journal.publishedAt =
      publishedAt ?? journal.publishedAt;

    await journal.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        journal,
        "Journal updated successfully.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default updateJournal;