import { FC, ReactNode } from "react";
import { BoxProps, styled, SxProps } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";

// styled components
const StyledFlexBox = styled(FlexBox)<{ open: number }>(({ open, theme }) => ({
  padding: ".5rem 1rem",
  alignItems: "center",
  justifyContent: "space-between",
  ".caretIcon": {
    transition: "transform 250ms ease-in-out",
    ...(theme.direction === "rtl"
      ? { transform: `rotate(${open ? "90deg" : "180deg"})` }
      : { transform: `rotate(${open ? "90deg" : "0deg"})` }),
  },
}));

// =================================================================
interface Props extends BoxProps {
  sx?: SxProps;
  open?: boolean;
  showIcon?: boolean;
  children: ReactNode;
}
// =================================================================

const AccordionHeader: FC<Props> = (props) => {
  const { open, children, showIcon = true, ...others } = props;

  return (
    <StyledFlexBox open={open ? 1 : 0} {...others}>
      {children}
      {showIcon && <ChevronRight className="caretIcon" fontSize="small" />}
    </StyledFlexBox>
  );
};

export default AccordionHeader;
