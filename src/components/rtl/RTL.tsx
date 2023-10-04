"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import createCache, { StylisPlugin } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import useSettings from "hooks/useSettings";

const RTL: FC<PropsWithChildren> = ({ children }) => {
  const { settings } = useSettings();

  useEffect(() => {
    document.dir = settings.direction;
  }, [settings.direction]);

  const cacheRTL = createCache({
    key: settings.direction === "rtl" ? "rtl" : "css",
    stylisPlugins:
      settings.direction === "rtl" ? ([prefixer, stylisRTLPlugin] as StylisPlugin[]) : [],
  });

  cacheRTL.compat = true;

  return <CacheProvider value={cacheRTL}>{children}</CacheProvider>;
};

export default RTL;
