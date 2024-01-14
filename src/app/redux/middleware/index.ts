import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
/**
 * Middleware to log and handle rejected actions from RTK Query
 */
const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: any) => {
  // Check if the action is rejected with a value
  const defaultMessage = "The action is rejected.";
  //
  if (isRejectedWithValue(action)) {
    console.error({
      title: defaultMessage,
      message: action?.payload?.data?.message,
    });
    enqueueSnackbar(action?.payload?.data?.message || defaultMessage, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
  return next(action);
};
//
export default rtkQueryErrorLogger;
