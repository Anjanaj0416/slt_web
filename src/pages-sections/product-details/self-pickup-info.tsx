import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SelfPickupInfo = ({ address }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <LocationOnIcon color="primary" sx={{ fontSize: 30 }} />
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" mb={0.2}>
          Self Pickup Only
        </Typography>
        <Typography textTransform="capitalize" variant="body2">
          {address}
        </Typography>
        <Typography variant="body2">+947-XXXX-XXXX</Typography>
      </Box>
    </Paper>
  );
};

export default SelfPickupInfo;
