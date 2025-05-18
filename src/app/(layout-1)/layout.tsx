"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { ShopLayout1 } from "components/layouts/shop-layout-1";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Layout1({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [pathSegments, setPathSegments] = useState<string[]>([]);
  useEffect(() => {
    // Get the pathname and split it
    const segments = pathname.split("?")[0].split("/").filter(Boolean);
    if (segments.length > 1 && segments[0] === "products") {
      segments[1] = decodeURIComponent(segments[1].split("_")?.[1]);
    }
    setPathSegments(segments);
  }, [pathname]);
  return (
    <ShopLayout1>
      {pathSegments.length > 0 && (
        <Box px={38} mt={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" style={{ textTransform: "capitalize" }}>
              Home
            </Link>
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              console.log(segment, isLast);

              if (isLast || segment.toLowerCase() === "products") {
                return (
                  <Typography
                    key={index}
                    color="text.primary"
                    textTransform="capitalize"
                  >
                    {segment}
                  </Typography>
                );
              }
              return (
                <Link
                  key={index}
                  href={`/${segment}`}
                  style={{ textTransform: "capitalize" }}
                >
                  {segment}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Box>
      )}
      {children}
    </ShopLayout1>
  );
}
