import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENT
import Scrollbar from "components/Scrollbar";

export const StyledCard = styled(Card)({
  height: "100%",
  borderRadius: "0px",
  position: "relative",
  padding: "20px 20px 14px 24px",
});

type Props = { scrolled: number };

export const StyledScrollbar = styled(Scrollbar)<Props>(({ theme, scrolled }) => ({
  boxShadow: theme.shadows[1],
  transition: "all 0.4s ease-in-out",
  maxHeight: scrolled ? "100%" : `calc(100% - ${104}px)`,
}));
