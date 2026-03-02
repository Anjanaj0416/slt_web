"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface ProductSkeletonProps {
  count?: number;
}

export default function ProductCardSkeleton({
  count = 5,
}: ProductSkeletonProps) {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid
          item
          key={index}
          xs={6} 
          sm={4} 
          md={3}
          lg={2.4} 
        >
          <Box
            sx={{
              borderRadius: 2,
              p: 1.5,
              boxShadow: 1,
              bgcolor: "background.paper",
            }}
          >
            {/* Image Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={180}
              sx={{ borderRadius: 2 }}
            />

            {/* Title */}
            <Skeleton sx={{ mt: 1 }} height={20} width="80%" />

            {/* Price */}
            <Skeleton height={20} width="40%" />

            {/* Button */}
            <Skeleton
              variant="rectangular"
              height={36}
              sx={{ mt: 1, borderRadius: 1 }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
