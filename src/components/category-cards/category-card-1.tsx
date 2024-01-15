import { FC } from "react";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { ENVIRONMENT } from "config";

// STYLED COMPONENTS
const Wrapper = styled("div")(({ theme }) => ({
  height: "100%",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "4px",
  position: "relative",
  "& img": { transition: "all 0.3s" },
  ":hover": {
    img: { transform: "scale(1.1)" },
    "& .category-title": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.dark.main,
    },
  },
}));

const CategoryTitle = styled("div")({
  left: 10,
  right: 10,
  bottom: 10,
  padding: 8,
  textAlign: "center",
  borderRadius: "2px",
  position: "absolute",
  transition: "all 0.3s",
  backgroundColor: "rgba(255,255,255, .67)",
});

// ============================================================
type Props = { image?: string; title: string };
// ============================================================

const CategoryCard1: FC<Props> = ({ image, title }) => {
  return (
    <Wrapper>
      <LazyImage
        src={
          !image
            ? `${ENVIRONMENT.APP_URL}/assets/images/default-category.jpg`
            : `${ENVIRONMENT.S3_BUCKET_URL}/${image}`
        }
        width={213}
        height={213}
        alt={title}
        sx={{
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />

      <CategoryTitle className="category-title">
        <H4>{title}</H4>
      </CategoryTitle>
    </Wrapper>
  );
};

export default CategoryCard1;
