import mongoose from "mongoose";

const wholesaleApplicationSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      unique: true,
      index: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    whatsapp: {
      type: String,
      required: true,
      trim: true,
    },

    businessType: {
      type: String,
      required: true,
      enum: [
        "Retailer",
        "Wholesaler",
        "Distributor",
        "Importer",
        "Exporter",
        "Interior Designer",
        "Hotel",
        "Other",
      ],
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    businessAddress: {
      type: String,
      required: true,
      trim: true,
    },

    categoriesInterested: {
      type: [String],
      default: [],
    },

    orderItems: {
      type: String,
      default: "",
      trim: true,
    },

    annualPurchase: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    yearsInBusiness: {
      type: Number,
      default: 0,
    },

    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewing", "Approved", "Rejected"],
      default: "Pending",
    },

    adminNotes: {
      type: String,
      default: "",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    tradeUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    browser: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model(
  "WholesaleApplication",
  wholesaleApplicationSchema,
);
