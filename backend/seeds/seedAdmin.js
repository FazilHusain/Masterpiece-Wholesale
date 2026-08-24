import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    const adminExists = await Admin.findOne({
      email: "admin@hismasterpiece.com",
    });

    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    await Admin.create({
      firstName: "Super",
      lastName: "Admin",

      email: "admin@hismasterpiece.com",

      password: "Admin@123",

      role: "super-admin",

      isActive: true,
    });

    console.log("✅ Super Admin Created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();