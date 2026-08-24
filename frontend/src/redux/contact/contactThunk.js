import { createAsyncThunk } from "@reduxjs/toolkit";

import * as contactService from "../../services/contact.service";

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (params, thunkAPI) => {
    try {
      const response = await contactService.getContacts(params);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchSingleContact = createAsyncThunk(
  "contact/fetchSingleContact",
  async (id, thunkAPI) => {
    try {
      const response = await contactService.getSingleContact(id);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const changeContactStatus = createAsyncThunk(
  "contact/changeStatus",
  async ({ id, payload }, thunkAPI) => {
    try {
      const response = await contactService.updateContactStatus(id, payload);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const removeContact = createAsyncThunk(
  "contact/delete",
  async (id, thunkAPI) => {
    try {
      await contactService.deleteContact(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const createContact = createAsyncThunk(
  "contact/create",
  async (payload, thunkAPI) => {
    try {
      const response = await contactService.createContact(payload);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong.",
      );
    }
  },
);
