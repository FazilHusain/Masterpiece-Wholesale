import express from "express";

import getProducts from "../../controllers/product/getProducts.js";
import searchProducts from "../../controllers/website/product/searchProducts.js";
import featuredProducts from "../../controllers/website/product/featuredProducts.js";
import newArrivalProducts from "../../controllers/website/product/newArrivalProducts.js";
import bestSellerProducts from "../../controllers/website/product/bestSellerProducts.js";
import getProductBySlug from "../../controllers/website/product/getProductBySlug.js";
import getRelatedProducts from "../../controllers/website/product/getRelatedProducts.js";

const router = express.Router();

// ==========================================
// ALL PRODUCTS
// ==========================================

router.get("/", getProducts);

// ==========================================
// SEARCH
// ==========================================

router.get("/search", searchProducts);

// ==========================================
// FEATURED
// ==========================================

router.get("/featured", featuredProducts);

// ==========================================
// NEW ARRIVALS
// ==========================================

router.get("/new-arrivals", newArrivalProducts);

// ==========================================
// BEST SELLERS
// ==========================================

router.get("/bestsellers", bestSellerProducts);

// ==========================================
// RELATED
// ==========================================

router.get("/related/:slug", getRelatedProducts);

// ==========================================
// SINGLE PRODUCT
// ==========================================

router.get("/:slug", getProductBySlug);

export default router;