import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import sampleRoutes from "./routes/sampleOrderRoutes.js";
import wholesaleRoutes from "./routes/wholesaleRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import homeRoutes from "./routes/website/homeRoutes.js";
import websiteProductRoutes from "./routes/website/websiteProductRoutes.js";
import websiteCollectionRoutes from "./routes/website/websiteCollectionRoutes.js";
import websiteCategoryRoutes from "./routes/website/websiteCategoryRoutes.js";
import navigationRoutes from "./routes/website/navigationRoutes.js";
import websiteJournalRoutes from "./routes/website/websiteJournalRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import quickOrderRoutes from "./routes/quickOrderRoutes.js";
import websiteBannerRoutes from "./routes/website/websiteBannerRoutes.js";
import websiteSettingRoutes from "./routes/website/websiteSettingRoutes.js";

dotenv.config();

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

/* ==========================
   Routes
========================== */

app.use("/admin", authRoutes);
app.use("/admin/admins", adminRoutes);
app.use("/admin/collections", collectionRoutes);
app.use("/admin/categories", categoryRoutes);
app.use("/admin/products", productRoutes);
app.use("/admin/settings", settingRoutes);
app.use("/admin/journal", journalRoutes);
app.use("/admin/banner", bannerRoutes);
app.use("/admin/sample-orders", sampleRoutes);
app.use("/api/sample-orders", sampleRoutes);
app.use("/admin/quick-orders", quickOrderRoutes);
app.use("/api/quick-orders", quickOrderRoutes);
app.use("/admin/wholesale", wholesaleRoutes);
app.use("/api/wholesale", wholesaleRoutes);
app.use("/contact", contactRoutes);
app.use("/admin/contact", contactRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", websiteProductRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/collections", websiteCollectionRoutes);
app.use("/api/category", websiteCategoryRoutes);
app.use("/api/navigation", navigationRoutes);
app.use("/api/journal", websiteJournalRoutes);
app.use("/api/banner", websiteBannerRoutes);
app.use("/api/settings", websiteSettingRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "His Masterpiece API Running 🚀",
  });
});

/* ==========================
   404 Middleware
========================== */

app.use(notFoundMiddleware);

/* ==========================
   Global Error Middleware
========================== */

app.use(errorMiddleware);

export default app;
