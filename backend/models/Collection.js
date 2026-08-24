import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    /* BASIC */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    /* MEDIA */

    bannerImage: {
      type: String,
      default: "",
    },

    thumbnailImage: {
      type: String,
      default: "",
    },

    featuredImage: {
      type: String,
      default: "",
    },

    /* STORY */

    storyTitle: {
      type: String,
      default: "",
    },

    storyDescription: {
      type: String,
      default: "",
    },

    storyVideo: {
      type: String,
      default: "",
    },

    /* SEO */

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    keywords: [String],

    /* HOME PAGE */

    isFeatured: {
      type: Boolean,
      default: false,
    },

    showOnHomepage: {
      type: Boolean,
      default: true,
    },

    /* STATUS */

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;