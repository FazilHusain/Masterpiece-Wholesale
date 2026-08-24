import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: true,
  },
);

const wholesaleInquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    inquiryNumber: {
      type: String,
      unique: true,
    },

    items: [itemSchema],

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "quotation-sent",
        "won",
        "lost",
        "cancelled",
      ],
      default: "pending",
    },

    adminNotes: {
      type: String,
      default: "",
    },
    quotationFile: {
      type: String,
      default: "",
    },
    quotedAt: {
      type: Date,
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WholesaleInquiry", wholesaleInquirySchema);
