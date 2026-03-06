import { FC } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

// ===============================================================
interface Props {
  bgImage?: string;
  bgImageTablet?: string;
  bgImageMobile?: string;
  mode?: "dark" | "light";
}
// ===============================================================

const CarouselCard4: FC<Props> = ({
  bgImage,
  bgImageMobile,
  bgImageTablet,
  mode = "dark",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const imageSrc = isMobile
    ? bgImageMobile || bgImage
    : isTablet
    ? bgImageTablet || bgImage
    : bgImage;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        lineHeight: 0,
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt="banner"
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: { lg: 480, xl: 680 },
          display: "block",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default CarouselCard4;