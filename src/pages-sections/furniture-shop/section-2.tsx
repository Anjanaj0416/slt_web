"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, useTheme } from "@mui/material";
import { H1, H3, H6, Paragraph } from "components/Typography";
// STYLED COMPONENTS
import { LeftContentBox, RightContent, RightContentBox, CustomButton } from "./styles";

const Section2 = () => {
  const router = useRouter();
  const { breakpoints } = useTheme();

  const product1 = "/assets/images/Furniture Shop/Furniture (6).png";
  const product2 = "/assets/images/Furniture Shop/Furniture (5).png";
  const product3 = "/assets/images/Furniture Shop/Furniture (1).png";
  const product4 = "/assets/images/Furniture Shop/Furniture (3).png";
  const product5 = "/assets/images/Furniture Shop/Furniture (4).png";

  return (
    <Fragment>
      <Grid container spacing={3}>
        {/* BIG SALE BANNER CARD */}
        <Grid item xs={12} sm={7} md={7}>
          <Link href="/sale-page-1">
            <LeftContentBox imgUrl={product1} sx={{ p: "20px 30px" }}>
              <RightContent>
                <H6>Modern Furniture.</H6>
                <H1 fontSize={35} color="primary.main">
                  Big Sale
                </H1>
                <H3 fontSize={23}>UP TO 50% OFF</H3>
                <CustomButton onClick={() => router.push("/sale-page-1")}>Shop Now</CustomButton>
              </RightContent>

              <Box />
            </LeftContentBox>
          </Link>
        </Grid>

        {/* UPTO 60% OFF BANNER CARD */}
        <Grid item xs={12} sm={5} md={5}>
          <Link href="/sale-page-1">
            <RightContentBox imgUrl={product2} sx={{ pt: "20px" }}>
              <Box textAlign="center">
                <H6>Sofa Collection</H6>
                <H3 fontSize={23} color="primary.main">
                  UP TO 60% OFF
                </H3>
                <CustomButton onClick={() => router.push("/sale-page-1")}>Shop Now</CustomButton>
              </Box>

              <Box className="content" />
            </RightContentBox>
          </Link>
        </Grid>
      </Grid>

      <Grid
        container
        mt={0}
        spacing={3}
        sx={{ [breakpoints.down("sm")]: { display: "flex", flexDirection: "column-reverse" } }}
      >
        {/* WINTER OFFER 50% OFF BANNER CARD */}
        <Grid item xs={12} sm={7} md={7}>
          <Link href="/sale-page-1">
            <RightContentBox
              imgUrl={product4}
              sx={{
                height: 484,
                pt: "20px",
                px: "80px",
                [breakpoints.between("xs", "sm")]: { px: "20px" },
              }}
            >
              <Box textAlign="center">
                <H3>Winter Offer!</H3>

                <H1 fontSize={50} color="primary.main">
                  50% OFF
                </H1>

                <H6>All Kind of Furniture Items</H6>

                <CustomButton onClick={() => router.push("/sale-page-1")}>Shop Now</CustomButton>
              </Box>

              <Box className="content" />
            </RightContentBox>
          </Link>
        </Grid>

        {/* SOFA & CHAIR COLLECTION BANNER CARDS */}
        <Grid item xs={12} sm={5} md={5}>
          {/* CHAR COLLECTION BANNER CARD */}
          <Link href="/sale-page-1">
            <LeftContentBox imgUrl={product5} sx={{ py: "20px", pl: "20px" }}>
              <RightContent>
                <Paragraph>Modern & Comfortable</Paragraph>

                <H3 fontSize={20} color="primary.main">
                  Chair Collection
                </H3>

                <CustomButton onClick={() => router.push("/sale-page-1")}>Shop Now</CustomButton>
              </RightContent>

              <Box />
            </LeftContentBox>
          </Link>

          {/* SOFA CHAIR BANNER CARD */}
          <Link href="/sale-page-1">
            <LeftContentBox imgUrl={product3} sx={{ mt: 3, py: "20px", pl: "20px" }}>
              <RightContent>
                <Paragraph>December New!</Paragraph>

                <H3 fontSize={20} color="primary.main">
                  Sofa Chair
                </H3>

                <CustomButton onClick={() => router.push("/sale-page-1")}>Shop Now</CustomButton>
              </RightContent>

              <Box />
            </LeftContentBox>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Section2;
