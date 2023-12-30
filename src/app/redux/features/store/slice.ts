// Import necessary modules and functions
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Store from "models/Store.model";
import { StoreState } from "./types";

export const initialState: StoreState = {};

// Create a Redux slice using createSlice
export const storeSlice = createSlice({
  name: "feature/store", // The name of the slice
  initialState, // Initial state for the slice
  reducers: {
    setStore: (state, action: PayloadAction<any>) => {}, // Define a reducer function called 'increment'
  },
});

// Export the actions from the slice
export const { actions: storeActions } = storeSlice;
