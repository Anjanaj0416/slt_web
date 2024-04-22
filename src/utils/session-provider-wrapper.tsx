"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ENVIRONMENT } from "config";
//
const SessionProviderWrapper = ({ children }) => {
  return (
    <SessionProvider
      refetchOnWindowFocus
      refetchInterval={Number(ENVIRONMENT.SESSION_REFRESH_TIME)}
    >
      {children}
    </SessionProvider>
  );
};
//
export default SessionProviderWrapper;
