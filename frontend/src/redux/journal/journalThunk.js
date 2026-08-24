import { createAsyncThunk } from "@reduxjs/toolkit";
import journalService from "../../services/journal.service";
import websiteJournalService from "../../services/website/websiteJournalService";

/* ===============================
   Get All
================================ */

export const fetchJournals = createAsyncThunk(
  "journal/fetchJournals",
  async (_, thunkAPI) => {
    try {
      return await journalService.getJournals();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch journals.",
      );
    }
  },
);

/* ===============================
   Get Single
================================ */

export const fetchJournal = createAsyncThunk(
  "journal/fetchJournal",
  async (id, thunkAPI) => {
    try {
      return await journalService.getJournalById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch journal.",
      );
    }
  },
);

/* ===============================
   Create
================================ */

export const createJournal = createAsyncThunk(
  "journal/createJournal",
  async (data, thunkAPI) => {
    try {
      return await journalService.createJournal(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create journal.",
      );
    }
  },
);

/* ===============================
   Update
================================ */

export const updateJournal = createAsyncThunk(
  "journal/updateJournal",
  async ({ id, data }, thunkAPI) => {
    try {
      return await journalService.updateJournal(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update journal.",
      );
    }
  },
);

/* ===============================
   Delete
================================ */

export const deleteJournal = createAsyncThunk(
  "journal/deleteJournal",
  async (id, thunkAPI) => {
    try {
      return await journalService.deleteJournal(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete journal.",
      );
    }
  },
);

/* ===============================
   Upload Featured Image
================================ */

export const uploadJournalFeaturedImage = createAsyncThunk(
  "journal/uploadFeaturedImage",
  async ({ id, image }, thunkAPI) => {
    try {
      return await journalService.uploadFeaturedImage(id, image);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to upload image.",
      );
    }
  },
);

/* ===============================
   Website - Get All
================================ */

export const fetchWebsiteJournals = createAsyncThunk(
  "journal/fetchWebsiteJournals",
  async (_, thunkAPI) => {
    try {
      return await websiteJournalService.getJournals();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch journals.",
      );
    }
  },
);

/* ===============================
   Website - Featured
================================ */

export const fetchFeaturedJournal = createAsyncThunk(
  "journal/fetchFeaturedJournal",
  async (_, thunkAPI) => {
    try {
      return await websiteJournalService.getFeaturedJournal();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured journal.",
      );
    }
  },
);

/* ===============================
   Website - Single
================================ */

export const fetchWebsiteJournal = createAsyncThunk(
  "journal/fetchWebsiteJournal",
  async (slug, thunkAPI) => {
    try {
      return await websiteJournalService.getJournal(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch journal.",
      );
    }
  },
);

/* ===============================
   Website - Related
================================ */

export const fetchRelatedJournals = createAsyncThunk(
  "journal/fetchRelatedJournals",
  async (slug, thunkAPI) => {
    try {
      return await websiteJournalService.getRelatedJournals(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch related journals.",
      );
    }
  },
);
