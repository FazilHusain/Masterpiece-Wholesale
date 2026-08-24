import { createAsyncThunk } from "@reduxjs/toolkit";
import collectionService from "../../services/collection.service";

export const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async (_, thunkAPI) => {
    try {
      return await collectionService.getCollections();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collections"
      );
    }
  }
);

export const fetchCollection = createAsyncThunk(
  "collection/fetchCollection",
  async (id, thunkAPI) => {
    try {
      return await collectionService.getCollection(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collection"
      );
    }
  }
);

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  async (payload, thunkAPI) => {
    try {
      return await collectionService.createCollection(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create collection"
      );
    }
  }
);

export const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async ({ id, data }, thunkAPI) => {
    try {
      return await collectionService.updateCollection(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update collection"
      );
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (id, thunkAPI) => {
    try {
      await collectionService.deleteCollection(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete collection"
      );
    }
  }
);