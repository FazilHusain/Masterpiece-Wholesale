import mongoose from "mongoose";

const sampleOrderSchema = new mongoose.Schema(
  {
    /* ORDER */

    orderNumber: {
      type: String,
      unique: true,
      index: true,
    },

    /* CUSTOMER */

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "",
    },

    /* PRODUCT */

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    variant: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    sku: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    /* PRICING */

    currency: {
      type: String,
      default: "USD",
    },

    samplePrice: {
      type: Number,
      default: 0,
    },

    shippingCost: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      default: 0,
    },

    /* =========================
   PAYMENT
========================= */

    paymentGateway: {
      type: String,
      default: "PayGlocal",
    },

    gatewayOrderId: {
      type: String,
      default: "",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    paymentReference: {
      type: String,
      default: "",
    },

    transactionId: {
      type: String,
      default: "",
    },

    paymentFailureReason: {
      type: String,
      default: "",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    /* SHIPPING */

    shippingAddress: String,

    city: String,

    state: String,

    postalCode: String,

    /* ADMIN */

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Packed",
        "Shipped",
        "Delivered",
      ],
      default: "Pending",
    },

    adminNote: {
      type: String,
      default: "",
    },

    tradeUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    reviewedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("SampleOrder", sampleOrderSchema);
