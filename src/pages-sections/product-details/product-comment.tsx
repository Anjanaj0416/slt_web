"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import BazaarRating from "components/BazaarRating";
import { H5, H6, Paragraph, Span } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { getDateDifference } from "lib";

// ===========================================================
interface Props {
  name: string;
  date: string;
  imgUrl: string;
  rating: number;
  comment: string;
}
// ===========================================================

const ProductComment: FC<Props> = (props) => {
  const { name, imgUrl, rating, date, comment } = props;

  return (
    <Box mb={4} maxWidth={600}>
      <FlexBox alignItems="center" mb={2} gap={2}>
        <Avatar src={imgUrl} sx={{ width: 48, height: 48 }} />

        <Box>
          <H5 mb={0.5}>{name}</H5>

          <FlexBox alignItems="center">
            <BazaarRating value={rating} color="warn" readOnly />

            <H6 mx={1.25}>{rating}</H6>

            <Span>{getDateDifference(date)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="grey.700">{comment}</Paragraph>
    </Box>
  );
};

export default ProductComment;
