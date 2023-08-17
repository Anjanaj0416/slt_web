import { layoutConstant } from "utils/constants";
import { Box, Button, Grid, Container, styled } from "@mui/material";

/** USED IN PAGE-VIEW FILE */
export const StyledContainer = styled(Container)(({ theme }) => ({
  gap: "1.75rem",
  display: "flex",
  padding: "0 !important",
  ".sidenav": {
    top: 0,
    bottom: 0,
    position: "relative",
    transition: "all 350ms ease-in-out",
    width: layoutConstant.grocerySidenavWidth,
    minWidth: layoutConstant.grocerySidenavWidth,
    // height: `calc(100vh - ${layoutConstant.headerHeight}px)`,
    "& .MuiPaper-root": { borderRadius: 0 },
    [theme.breakpoints.down("md")]: { display: "none" },
  },
  ".pageContent": {
    left: "unset",
    position: "relative",
    width: `calc(100% - ${layoutConstant.grocerySidenavWidth}px)`,
    [theme.breakpoints.down("md")]: { width: "100%", marginLeft: 0 },
  },
}));

/** USED IN SECTION-1 FILE */
export const StyledBox = styled(Box)({
  marginBottom: 60,
  overflow: "hidden",
  "& .carousel-dot": {
    left: 0,
    right: 0,
    bottom: "30px",
    margin: "auto",
    position: "absolute",
  },
});

export const ContainerBox = styled(Box)(({ theme }) => ({
  minHeight: 650,
  display: "flex",
  alignItems: "center",
  backgroundImage: "url('/assets/images/Furniture Shop/Furniture Shop Header.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  transition: "all 0.3s",
  [theme.breakpoints.down("md")]: { height: "60vh" },
  [theme.breakpoints.down("sm")]: { height: "50vh" },
}));

export const StyledGrid = styled(Grid)({
  maxWidth: 1280,
  margin: "auto",
  position: "relative",
  alignItems: "center",
  padding: "2rem 0px 5rem 0px",
});

export const GridItemOne = styled(Grid)(({ theme }) => ({
  padding: 20,
  "& h1": { fontSize: 60 },
  [theme.breakpoints.down("md")]: {
    "& h1": { fontSize: 50 },
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    "& h1": { fontSize: 40 },
  },
}));

export const StyledButton = styled(Button)({
  color: "#fff",
  fontWeight: 400,
  borderRadius: 0,
  fontSize: "16px",
  padding: "8px 30px",
});

export const TextBox = styled(Box)(({ theme }) => ({
  marginTop: 5,
  marginBottom: 40,
  paddingRight: 100,
  [theme.breakpoints.down("md")]: { paddingRight: 0 },
}));

/** USED IN SECTION-2 FILE */
const BOX_STYLE = {
  height: 230,
  display: "flex",
  borderRadius: 0,
  boxShadow: "none",
  alignItems: "center",
};

export const LeftContentBox = styled(Box, {
  shouldForwardProp: (props) => props !== "imgUrl",
})<{ imgUrl: string }>(({ theme, imgUrl }) => ({
  ...BOX_STYLE,
  background: theme.palette.primary[50],
  backgroundImage: `url('${imgUrl}')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundOrigin: "content-box",
  backgroundPosition: "right bottom",
}));

export const RightContentBox = styled(Box, {
  shouldForwardProp: (props) => props !== "imgUrl",
})<{ imgUrl: string }>(({ theme, imgUrl }) => ({
  ...BOX_STYLE,
  display: "block",
  background: theme.palette.primary[50],
  backgroundImage: `url('${imgUrl}')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "bottom",
  backgroundOrigin: "content-box",
}));

export const RightContent = styled(Box)({
  "& p": { fontSize: 13, lineHeight: 1.4 },
});

export const CustomButton = styled(Button)({
  fontWeight: 600,
  fontSize: "12px",
  marginTop: "5px",
  padding: "4px 12px",
  textDecoration: "underline",
});
