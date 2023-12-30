import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
/**
 * Middleware to log and handle rejected actions from RTK Query
 */
const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // Check if the action is rejected with a value
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!"); // Log a warning
      console.log({
        title: "Async error!",
        message: action?.error?.data?.message,
      }); // Show an error message
    }
    return next(action);
  };
//
export default rtkQueryErrorLogger;
