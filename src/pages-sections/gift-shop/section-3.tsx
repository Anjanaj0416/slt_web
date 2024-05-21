"use client";

import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import { H3, H6, Paragraph } from "components/Typography";
// STYLED COMPONENTS
import { LeftCard, RightCard, StyledButton } from "./styles";

const Section3 = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={7} md={7}>
        <Link href="/sales-1">
          <LeftCard>
            <Image
              alt="offer"
              src={require("../../../public/assets/images/Gift Shop/Offer Card.png")}
              style={{ width: "100%", height: "auto", zIndex: 0 }}
            />

            <div className="content">
              <H6>Holiday’s Offer!</H6>
              <H3>Sale 50% Off</H3>
              <Paragraph mt={1}>Use Code : Holi50</Paragraph>
              <StyledButton>Shop Now</StyledButton>
            </div>
          </LeftCard>
        </Link>
      </Grid>

      <Grid item xs={12} sm={5} md={5}>
        <Link href="/sales-1">
          <RightCard>
            <div className="content">
              <H6>Shop Online Gift Under</H6>
              <H3>$20.00</H3>
              <StyledButton>Shop Now</StyledButton>
            </div>

            <Image
              alt="offer"
              src={require("../../../public/assets/images/Gift Shop/Offer 1.png")}
              style={{
                width: "100%",
                height: "auto",
                zIndex: 0,
                bottom: 0,
                position: "absolute",
              }}
            />
          </RightCard>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Section3;
