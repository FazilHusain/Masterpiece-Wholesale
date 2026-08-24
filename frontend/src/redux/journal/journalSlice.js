import { createSlice } from "@reduxjs/toolkit";

import {
  fetchJournals,
  fetchJournal,
  fetchWebsiteJournals,
  fetchFeaturedJournal,
  fetchWebsiteJournal,
  fetchRelatedJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  uploadJournalFeaturedImage,
} from "./journalThunk";

const initialState = {
  journals: [],
  journal: null,

  loading: false,
  error: null,

  pagination: null,
  websiteJournals: [],
  featuredJournal: null,
  relatedJournals: [],
};

const journalSlice = createSlice({
  name: "journal",

  initialState,

  reducers: {
    clearJournal(state) {
      state.journal = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ==========================
         Fetch Journals
      ========================== */

      .addCase(fetchJournals.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchJournals.fulfilled, (state, action) => {
        state.loading = false;

        state.journals =
          action.payload.data?.journals ||
          action.payload.data?.requests ||
          action.payload.data ||
          [];

        state.pagination = action.payload.data?.pagination || null;
      })

      .addCase(fetchJournals.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ==========================
         Fetch Single
      ========================== */

      .addCase(fetchJournal.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchJournal.fulfilled, (state, action) => {
        state.loading = false;

        state.journal = action.payload.data;
      })

      .addCase(fetchJournal.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ==========================
         Create
      ========================== */

      .addCase(createJournal.pending, (state) => {
        state.loading = true;
      })

      .addCase(createJournal.fulfilled, (state, action) => {
        state.loading = false;

        state.journals.unshift(action.payload.data);
      })

      .addCase(createJournal.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ==========================
         Update
      ========================== */

      .addCase(updateJournal.fulfilled, (state, action) => {
        const updated = action.payload.data;

        state.journal = updated;

        state.journals = state.journals.map((item) =>
          item._id === updated._id ? updated : item,
        );
      })

      /* ==========================
         Delete
      ========================== */

      .addCase(deleteJournal.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;

        state.journals = state.journals.filter(
          (item) => item._id !== deletedId,
        );
      })

      /* ==========================
         Upload Featured Image
      ========================== */

      .addCase(uploadJournalFeaturedImage.fulfilled, (state, action) => {
        state.journal = action.payload.data;

        state.journals = state.journals.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })

      /* ==========================
         Website - Fetch Journals
      ========================== */

      .addCase(fetchWebsiteJournals.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWebsiteJournals.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload;

        const journals = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.data?.journals)
              ? response.data.journals
              : [];

        state.websiteJournals = journals;
      })
      
      .addCase(fetchWebsiteJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ==========================
         Website - Featured Journal
      ========================== */

      .addCase(fetchFeaturedJournal.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFeaturedJournal.fulfilled, (state, action) => {
        state.loading = false;

        state.featuredJournal = action.payload.data;
      })

      .addCase(fetchFeaturedJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ==========================
         Website - Single Journal
      ========================== */

      .addCase(fetchWebsiteJournal.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWebsiteJournal.fulfilled, (state, action) => {
        state.loading = false;

        state.journal = action.payload.data;
      })

      .addCase(fetchWebsiteJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ==========================
         Website - Related Journals
      ========================== */

      .addCase(fetchRelatedJournals.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRelatedJournals.fulfilled, (state, action) => {
        state.loading = false;

        state.relatedJournals =
          action.payload.data?.journals || action.payload.data || [];
      })

      .addCase(fetchRelatedJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJournal } = journalSlice.actions;

export default journalSlice.reducer;
