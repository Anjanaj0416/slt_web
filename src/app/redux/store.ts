"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rtkQueryErrorLogger from "./middleware";
import { productApi } from "services/product-api";
import { authSlice } from "./features/auth/slice";
import { cartApi } from "services/cart-api";
import { categoryApi } from "services/category-api";
import { addressApi } from "services/address-api";
import { orderApi } from "services/order-api";
import { userApi } from "services/user-api";
import { fileApi } from "services/file-api";
import { wishlistApi } from "services/wishlist-api";
import { storeApi } from "services/store-api";
import { storeAndProductSearchApi } from "services/store-and-product-search-api";
import { quotationApi } from "services/quotation-api";
import { reviewApi } from "services/review-api";

// Combine all the reducers into one root reducer
const rootReducers = combineReducers({
  [productApi.reducerPath]: productApi.reducer, // Use the reducer from the productApi slice
  [cartApi.reducerPath]: cartApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [storeAndProductSearchApi.reducerPath]: storeAndProductSearchApi.reducer,
  [quotationApi.reducerPath]: quotationApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
});

// Define custom middlewares for the store
const apiMiddlewares = [
  productApi.middleware,
  categoryApi.middleware,
  cartApi.middleware,
  addressApi.middleware,
  orderApi.middleware,
  userApi.middleware,
  fileApi.middleware,
  wishlistApi.middleware,
  storeApi.middleware,
  storeAndProductSearchApi.middleware,
  quotationApi.middleware,
  reviewApi.middleware,
]; // Middleware for Redux Toolkit Query
//
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
