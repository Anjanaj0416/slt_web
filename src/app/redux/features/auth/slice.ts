import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the test feature
export const initialState = {
  user: {},
  firstName: "",
  lastName: "",
  email: "",
};
// Create a Redux slice using createSlice
export const authSlice = createSlice({
  name: "feature/auth", // The name of the slice
  initialState, // Initial state for the slice
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state.user,
        ...action.payload,
      };
    },
  },
});
// Export the actions from the slice
export const { actions: authActions } = authSlice;
