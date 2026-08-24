import { createAsyncThunk } from "@reduxjs/toolkit";
import homeService from "../../services/website/homeService";

export const fetchHomePage= createAsyncThunk("home/fetchHomePage",
    async(_,thunkAPI)=>{
        try{
            return await homeService.getHomePage();
        }catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch homepage"
            );
        }
    }
)