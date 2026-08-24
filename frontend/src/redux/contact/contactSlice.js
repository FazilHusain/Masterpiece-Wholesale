import { createSlice } from "@reduxjs/toolkit";

import {
  fetchContacts,
  fetchSingleContact,
  changeContactStatus,
  removeContact,
  createContact,
} from "./contactThunk";

const initialState = {
  contacts: [],
  contact: null,
  pagination: {},

  loading: false,
  success: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })

      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;

        state.contacts = action.payload.contacts;

        state.pagination = action.payload.pagination;
      })

      .addCase(fetchSingleContact.fulfilled, (state, action) => {
        state.contact = action.payload;
      })

      .addCase(changeContactStatus.fulfilled, (state, action) => {
        state.contact = action.payload;
      })

      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (item) => item._id !== action.payload,
        );
      })

      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contact = action.payload.data;
      })

      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Something went wrong.";
        },
      );
  },
});

export default contactSlice.reducer;
