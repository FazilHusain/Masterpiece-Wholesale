import { createAsyncThunk } from "@reduxjs/toolkit";
import websiteCollectionService from "../../services/website/websiteCollectionService";

export const fetchWebsiteCollections = createAsyncThunk(
  "websiteCollection/fetchWebsiteCollections",
  async (_, thunkAPI) => {
    try {
      return await websiteCollectionService.getCollections();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collections.",
      );
    }
  },
);

export const fetchWebsiteCollection = createAsyncThunk(
  "websiteCollection/fetchWebsiteCollection",
  async (slug, thunkAPI) => {
    try {
      const response = await websiteCollectionService.getCollection(slug);

      console.log("🔥 WEBSITE COLLECTION API RESPONSE:", response);
      console.log("🔥 WEBSITE COLLECTION DATA:", response?.data);

      return response;
    } catch (error) {
      console.error(
        "❌ WEBSITE COLLECTION ERROR:",
        error.response?.data || error,
      );

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collection.",
      );
    }
  },
);

export const fetchCollectionProducts = createAsyncThunk(
  "websiteCollection/fetchCollectionProducts",
  async (slug, thunkAPI) => {
    try {
      const response =
        await websiteCollectionService.getCollectionProducts(slug);

      console.log("🔥 COLLECTION PRODUCTS API RESPONSE:", response);

      console.log("🔥 COLLECTION PRODUCTS DATA:", response?.data);

      return response;
    } catch (error) {
      console.error(
        "❌ COLLECTION PRODUCTS ERROR:",
        error.response?.data || error,
      );

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collection products.",
      );
    }
  },
);
