"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { FlexRowCenter } from "components/flex-box";
import { H4, Span } from "components/Typography";
// CUSTOM DATA MODEL
import Service from "models/Service.model";

// STYLED COMPONENTS
const StyledFlexBox = styled(Box)(({ theme }) => ({
  display: "grid",
  padding: "2rem 0",
  gridTemplateColumns: "repeat(4, 1fr)",
  borderTop: `1px solid ${theme.palette.grey[300]}`,
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  [theme.breakpoints.down("md")]: {
    gap: 30,
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gap: 30,
    paddingLeft: "2rem",
    paddingRight: "2rem",
    gridTemplateColumns: "1fr",
  },
}));

// ==============================================================
type Props = { services: Service[] };
// ==============================================================

const Section7: FC<Props> = ({ services }) => {
  return (
    <Container sx={{ mt: 8 }}>
      <StyledFlexBox>
        {services.map((item, ind) => (
          <FlexRowCenter flexDirection="column" key={ind}>
            <H4 lineHeight={1.3}>{item.title}</H4>
            <Span color="grey.600">{item.description}</Span>
          </FlexRowCenter>
        ))}
      </StyledFlexBox>
    </Container>
  );
};

export default Section7;
