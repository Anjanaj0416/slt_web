import { FC } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { alpha, styled } from "@mui/material/styles";
// MUI ICON COMPONENTS
import Call from "@mui/icons-material/Call";
import Place from "@mui/icons-material/Place";
// GLOBAL CUSTOM COMPONENTS
import { H3, Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
// CUSTOM DATA MODEL
import Store from "models/Store.model";
import { ENVIRONMENT } from "config";

// STYLED COMPONENT
const ContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "img",
})<{ img: string }>(({ theme, img }) => ({
  color: "white",
  backgroundSize: "cover",
  padding: "17px 30px 56px",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(to bottom,
    ${alpha(theme.palette.grey[900], 0.8)}, ${alpha(
      theme.palette.grey[900],
      0.5
    )}), 
    url(${img})`,
}));

const StyledCard = styled(Card)(() => ({
  cursor: "pointer",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
  },
}));

const ShopCard: FC<Partial<Store>> = (props) => {
  const { name, address, telephone, logoFilePath, id, coverImageFilePath } =
    props || {};

  return (
    <Link href={`/shops/${id}_${name}`} style={{ textDecoration: "none" }}>
      <StyledCard>
        <ContentWrapper
          img={`${ENVIRONMENT.S3_BUCKET_URL}/${coverImageFilePath}`}
        >
          <H3
            fontWeight="600"
            mb={1}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {name}
          </H3>

          <FlexBox mb={1} gap={1}>
            <Place fontSize="small" sx={{ fontSize: 17, mt: "3px" }} />
            <Span color="white" sx={{ textTransform: "capitalize" }}>
              {address}
            </Span>
          </FlexBox>

          <FlexBox alignItems="center" gap={1}>
            <Call fontSize="small" sx={{ fontSize: 17 }} />
            <Span color="white">{telephone}</Span>
          </FlexBox>
        </ContentWrapper>

        <FlexBox pl={3} pr={1} pb={1}>
          <Avatar
            alt={name}
            src={`${ENVIRONMENT.S3_BUCKET_URL}/${logoFilePath}`}
            sx={{
              width: 64,
              height: 64,
              mt: "-32px",
              ...(!logoFilePath && { backgroundColor: "#f44336" }),
              border: "3px solid",
              borderColor: "grey.100",
            }}
          />
        </FlexBox>
      </StyledCard>
    </Link>
  );
};

export default ShopCard;