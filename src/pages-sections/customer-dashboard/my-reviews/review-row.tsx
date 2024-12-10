import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
// MUI ICON COMPONENT
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Review1 } from "models/Review.model";
import { ENVIRONMENT } from "config";
// CUSTOM DATA MODEL

// =============================================================================
type Props = { review: Review1 };
// =============================================================================

const ReviewRow: FC<Props> = ({ review }) => {
  const { product, text, rating } = review || {};
  const imgUrl = product.images?.[0]
    ? `${ENVIRONMENT.S3_BUCKET_URL}/${product.images[0]}`
    : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`;
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar alt={product.name} src={imgUrl} sx={{ borderRadius: "8px" }} />
          <Paragraph fontWeight={600}>{product.name}</Paragraph>
        </FlexBox>
      </StyledTableCell>


      <StyledTableCell align="left">
        <Small>{text}</Small>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Rating value={rating} size="small" color="warning" readOnly />
      </StyledTableCell>

    </StyledTableRow>
  );
};

export default ReviewRow;
