import { createSlice } from "@reduxjs/toolkit";

import { fetchHomePage } from "./homeThunk";

const initialState = {
    heroCollection :[],
    featuredCollactions:[],
    featuredCategories:[],
    featuredProducts:[],
    newArrivals:[],
    bestSellers:[],

    loading:false,
    error:null,
};

const homeSlice = createSlice({
    name:"home",
    initialState,

    reducers:{},

    extraReducers:(builder) =>{
        builder


            // Request started
            .addCase(fetchHomePage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
             // Request successful
            .addCase(fetchHomePage.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const data = action.payload?.data || action.payload;

                state.heroCollections = data?.heroCollections || [];
                state.featuredCollections = data?.featuredCollections || [];
                state.featuredCategories = data?.featuredCategories || [];
                state.featuredProducts = data?.featuredProducts || [];
                state.newArrivals = data?.newArrivals || [];
                state.bestSellers = data?.bestSellers || [];
            })
             // Request failed
            .addCase(fetchHomePage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch homepage";
            });
    },
});

export default homeSlice.reducer;