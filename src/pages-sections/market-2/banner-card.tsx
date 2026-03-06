import { FC } from "react";
import Box, { BoxProps } from "@mui/material/Box";

// ========================================================
interface Props extends BoxProps {
  img: string;
  imageFull?: boolean;
}
// ========================================================

const BannerCard: FC<Props> = ({ img, imageFull, ...props }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        lineHeight: 0,
      }}
      {...props}
    >
      <Box
        component="img"
        src={img}
        alt="banner"
        sx={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default BannerCard;