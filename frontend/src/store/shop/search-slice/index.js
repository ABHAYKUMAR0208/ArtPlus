import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  isLoading: false, 
  searchResults: [], 
  searchTerm: "", 
  error: null, 
};

// Fetch search results async thunk
export const getSearchResults = createAsyncThunk(
  "shop/getSearchResults",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/search/${keyword}`
      );
      return response.data; 
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Search slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
      state.searchTerm = "";
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data || [];
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch search results"; 
        state.searchResults = []; 
      });
  },
});

export const { resetSearchResults, setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
