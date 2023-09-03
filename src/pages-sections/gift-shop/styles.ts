import { Theme } from "@mui/material";

export const CAROUSEL_STYLE = (theme: Theme, slider = false) => {
  return {
    ...(slider && { "& .carousel__slider": { paddingBottom: "15px" } }),
    "& #backArrowButton, #backForwardButton": {
      width: 35,
      height: 35,
      borderRadius: 0,
      boxShadow: theme.shadows[2],
      color: theme.palette.primary.main,
      background: theme.palette.primary[50],
      "&:hover": { background: theme.palette.primary[100] },
    },
  };
};
