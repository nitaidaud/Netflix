import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BrowseState {
  selectedCategory?: string;
  searchQuery?: string;
}

const initialState: BrowseState = {
  selectedCategory: undefined,
  searchQuery: undefined,
};

const browseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | undefined>) => {
      state.selectedCategory = action.payload;
      state.searchQuery = undefined;
    },
    setSearchQuery: (state, action: PayloadAction<string | undefined>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = undefined;
      state.searchQuery = undefined;
    }
  },
});

export const { setCategory, setSearchQuery, clearFilters } = browseSlice.actions;

export default browseSlice.reducer;