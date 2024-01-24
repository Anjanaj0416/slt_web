"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rtkQueryErrorLogger from "./middleware";
import { productApi } from "services/product-api";
import { authSlice } from "./features/auth/slice";
import { categoryApi } from "services/category-api";

// Combine all the reducers into one root reducer
const rootReducers = combineReducers({
  [productApi.reducerPath]: productApi.reducer, // Use the reducer from the productApi slice
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authSlice.name]: authSlice.reducer,
});

// Define custom middlewares for the store
const apiMiddlewares: any[] = [productApi.middleware, categoryApi.middleware]; // Middleware for Redux Toolkit Query
const customMiddleWares = [rtkQueryErrorLogger]; // Custom middleware for handling errors

// Create the Redux store
export const store = configureStore({
  reducer: rootReducers, // Set the combined root reducer
  devTools: true, // Enable Redux DevTools extension for development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddlewares).concat(customMiddleWares), // Apply middlewares
});

// Setup listeners for Redux Toolkit Query to handle API requests
setupListeners(store.dispatch);

// Define types for RootState and AppDispatch for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
