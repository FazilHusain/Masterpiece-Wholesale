import mongoose from "mongoose";

/* ===========================
   Gallery Images
=========================== */

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: "",
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: true },
);

/* ===========================
   Videos
=========================== */

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: true,
  },
);

/* ===========================
   Story Sections
=========================== */

const storySectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

/* ===========================
   Downloads
=========================== */

const downloadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    file: {
      type: String,
      required: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: true,
  },
);

/* ===========================
   Wholesale Variants
=========================== */

const variantSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },

    dimensions: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    sku: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    moq: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: true,
  },
);

/* ===========================
   Sample Product
=========================== */

const sampleSchema = new mongoose.Schema(
  {
    available: {
      type: Boolean,
      default: true,
    },

    sku: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

/* ===========================
   Product
=========================== */

const productSchema = new mongoose.Schema(
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

    sku: {
      type: String,
      required: true,
      unique: true,
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

    /* RELATIONS */

    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    /* PRODUCT INFO */

    material: {
      type: String,
      default: "",
    },

    pattern: {
      type: String,
      default: "",
    },

    colorFamily: {
      type: String,
      default: "",
    },

    hsCode: {
      type: String,
      default: "",
      trim: true,
    },

    countryOfOrigin: {
      type: String,
      default: "India",
    },

    leadTime: {
      type: String,
      default: "",
    },

    careInstructions: {
      type: String,
      default: "",
    },

    /* MEDIA */

    featuredImage: {
      type: String,
      required: true,
    },

    gallery: {
      type: [imageSchema],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
        message: "Maximum 10 gallery images allowed.",
      },
    },

    videos: [videoSchema],

    /* STORY */

    storySections: [storySectionSchema],

    /* SAMPLE */

    sample: sampleSchema,

    /* WHOLESALE */

    variants: [variantSchema],

    /* DOWNLOADS */

    downloads: [downloadSchema],

    /* SEO */

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    searchKeywords: [String],

    /* BADGES */

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isNew: {
      type: Boolean,
      default: false,
    },

    /* VISIBILITY */

    visibility: {
      type: String,
      enum: ["both", "trade", "customer"],
      default: "both",
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

    tags: [String],

    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    adminNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
