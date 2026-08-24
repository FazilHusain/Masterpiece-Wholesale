import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    /* ======================
       GENERAL
    ====================== */

    websiteName: {
      type: String,
      default: "",
    },

    websiteTagline: {
      type: String,
      default: "",
    },

    websiteUrl: {
      type: String,
      default: "",
    },

    /* ======================
       BRANDING
    ====================== */

    logo: {
      type: String,
      default: "",
    },

    footerLogo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    /* ======================
       CONTACT
    ====================== */

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    googleMap: {
      type: String,
      default: "",
    },

    /* ======================
       SOCIAL
    ====================== */

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    pinterest: {
      type: String,
      default: "",
    },

    /* ======================
       SEO
    ====================== */

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    metaKeywords: [
      {
        type: String,
      },
    ],

    /* ======================
       BUSINESS
    ====================== */

    currency: {
      type: String,
      default: "USD",
    },

    currencySymbol: {
      type: String,
      default: "$",
    },

    timezone: {
      type: String,
      default: "UTC",
    },

    /* ======================
       STATUS
    ====================== */

    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Setting", settingSchema);