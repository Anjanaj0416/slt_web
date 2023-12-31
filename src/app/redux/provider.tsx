// Import necessary modules and functions
"use client";
import { Provider } from "react-redux";
import { store } from "./store"; // Import the Redux store created previously

// A React component that wraps the application with the Redux store
export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {" "}
      {/* Provide the Redux store to the application */}
      {children}{" "}
      {/* Render the children components inside the Redux Provider */}
    </Provider>
  );
}
