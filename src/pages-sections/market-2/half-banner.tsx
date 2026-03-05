"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// CUSTOM UTILS LIBRARY FUNCTION
import Banner from "models/Banner.model";
import { FC } from "react";
import { ENVIRONMENT } from "config";
import Link from "next/link";

// ======================================================================
type Props = { data: Banner[] };
// ======================================================================

const HalfBanner: FC<Props> = ({ data }) => {
  return (
    <Grid
      container
      spacing={2}
      mb={{ xs: 1, md: 0 }}
      mt={{ xs: "1px", md: 0 }}
    >
      <Grid item md={6} xs={12}>
        <Link href={data[0]?.link} target="_blank">
          <Box
            sx={{
              width: "100%",
              borderRadius: "6px",
              overflow: "hidden",
              lineHeight: 0,
            }}
          >
            <Box
              component="img"
              src={`${ENVIRONMENT.S3_BUCKET_URL}/${data[0]?.imageUrl}`}
              alt="Banner 1"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                borderRadius: "6px",
              }}
            />
          </Box>
        </Link>
      </Grid>

      <Grid item md={6} xs={12}>
        <Link href={data?.[1]?.link} target="_blank">
          <Box
            sx={{
              width: "100%",
              borderRadius: "6px",
              overflow: "hidden",
              lineHeight: 0,
            }}
          >
            <Box
              component="img"
              src={`${ENVIRONMENT.S3_BUCKET_URL}/${data?.[1]?.imageUrl}`}
              alt="Banner 2"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                borderRadius: "6px",
              }}
            />
          </Box>
        </Link>
      </Grid>
    </Grid>
  );
};

export default HalfBanner;