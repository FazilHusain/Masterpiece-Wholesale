import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    buttonText: {
      type: String,
      default: "",
      trim: true,
    },

    buttonLink: {
      type: String,
      default: "",
      trim: true,
    },

    desktopImage: {
      type: String,
      default: "",
    },

    mobileImage: {
      type: String,
      default: "",
    },

    page: {
      type: String,
      enum: [
        "Home",
        "About",
        "Collections",
        "Products",
        "Journal",
        "Wholesale",
        "Trade",
        "Contact",
      ],
      default: "Home",
    },

    type: {
      type: String,
      enum: [
        "Hero",
        "Middle",
        "Bottom",
        "Offer",
      ],
      default: "Hero",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Banner",
  bannerSchema
);