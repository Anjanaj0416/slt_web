"use client";
import React from "react";
import { Provider } from "react-redux";
//
const ReduxProviderWrapper = ({ children, store }) => {
  return <Provider store={store}>{children}</Provider>;
};
//
export default ReduxProviderWrapper;
