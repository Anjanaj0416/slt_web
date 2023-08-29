import { styled } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import Scrollbar from "components/Scrollbar";

export const StyledCard = styled(BazaarCard)({
  height: "100%",
  borderRadius: "0px",
  position: "relative",
  padding: "20px 20px 14px 24px",
});

export const StyledScrollbar = styled(Scrollbar)<{ scrolled: number }>(({ theme, scrolled }) => ({
  boxShadow: theme.shadows[1],
  marginTop: scrolled ? 3 : 0,
  transition: "all 0.4s ease-in-out",
  maxHeight: scrolled ? "100%" : `calc(100% - ${104}px)`,
}));
