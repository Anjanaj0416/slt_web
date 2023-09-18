import Card, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// ===============================================
interface Props extends CardProps {
  hoverEffect?: boolean;
}
// ===============================================

const BazaarCard = styled(Card)<Props>(({ theme, hoverEffect }) => ({
  overflow: "unset",
  borderRadius: "8px",
  transition: "all 250ms ease-in-out",
  "&:hover": { ...(hoverEffect && { boxShadow: theme.shadows[3] }) },
}));

export default BazaarCard;
