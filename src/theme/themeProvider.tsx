"use client";

import { PropsWithChildren } from "react";
import getConfig from "next/config";
import { usePathname } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme, ThemeOptions, responsiveFontSizes } from "@mui/material/styles";
import merge from "lodash/merge";

import useSettings from "hooks/useSettings";
import customThemeOptions from "./themeOptions";
import NextAppDirEmotionCacheProvider from "./emotionCache";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const { settings } = useSettings();
  const { publicRuntimeConfig } = getConfig() || {}; // Value is coming from next.config.js

  // console.log(publicRuntimeConfig);

  const themeOptions = customThemeOptions(publicRuntimeConfig, pathname);

  const mergedThemeOptions = merge({}, { ...themeOptions, direction: settings.direction });

  let theme = createTheme(mergedThemeOptions as ThemeOptions);

  theme = responsiveFontSizes(theme);

  // theme shadows
  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default ThemeProvider;
