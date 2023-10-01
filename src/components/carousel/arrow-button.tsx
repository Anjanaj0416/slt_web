import { CSSProperties, Fragment } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import clsx from "clsx";
// GLOBAL CUSTOM HOOK
import useSettings from "hooks/useSettings";
// STYLED COMPONENTS
import { StyledArrowBackButton, StyledArrowNextButton } from "./styles";

// ==============================================================
interface Props {
  arrowButtonClass: string;
  leftButtonClass?: string;
  rightButtonClass?: string;
  leftButtonStyle?: CSSProperties;
  rightButtonStyle?: CSSProperties;
}
// ==============================================================

const ArrowButton = ({
  leftButtonClass,
  rightButtonClass,
  leftButtonStyle,
  rightButtonStyle,
  arrowButtonClass,
}: Props) => {
  // site settings
  const { settings } = useSettings();

  return (
    <Fragment>
      <StyledArrowBackButton
        id="backArrowButton"
        style={leftButtonStyle}
        className={clsx(leftButtonClass, arrowButtonClass)}
      >
        {settings.direction === "ltr" ? (
          <ArrowBack fontSize="small" color="inherit" />
        ) : (
          <ArrowForward fontSize="small" color="inherit" />
        )}
      </StyledArrowBackButton>

      <StyledArrowNextButton
        id="backForwardButton"
        style={rightButtonStyle}
        className={clsx(arrowButtonClass, rightButtonClass)}
      >
        {settings.direction === "ltr" ? (
          <ArrowForward fontSize="small" color="inherit" />
        ) : (
          <ArrowBack fontSize="small" color="inherit" />
        )}
      </StyledArrowNextButton>
    </Fragment>
  );
};

export default ArrowButton;
