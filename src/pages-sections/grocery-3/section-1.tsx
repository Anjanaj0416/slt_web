import { FC } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
// GLOBAL CUSTOM COMPONENTS
import { H1 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
// CUSTOM DATA MODEL
import { MainCarouselItem } from "models/Grocery-3.model";
// STYLED COMPONENTS
import {
  TextBox,
  StyledBox,
  Container,
  StyledGrid,
  GridItemOne,
  GridItemTwo,
  StyledButton,
} from "./styles";

// ===================================================================
type Props = { mainCarouselData: MainCarouselItem[] };
// ===================================================================

const Section1: FC<Props> = ({ mainCarouselData }) => {
  const { palette } = useTheme();

  return (
    <StyledBox id="carouselBox">
      <Carousel
        spacing="0px"
        showDots={true}
        autoPlay={false}
        showArrow={false}
        visibleSlides={1}
        dotClass="carousel-dot"
        dotColor={palette.primary.main}
        totalSlides={mainCarouselData.length}
      >
        {mainCarouselData.map((item, ind) => (
          <Container key={ind}>
            <StyledGrid container>
              <GridItemOne item md={6} sm={6} xs={12}>
                <Box pt={6}>
                  <LazyImage width={800} height={886} alt={item.title} src={item.imgUrl} />
                </Box>
              </GridItemOne>

              <GridItemTwo item md={6} sm={6} xs={12}>
                <TextBox>
                  <H1 maxWidth={400}>{item.title}</H1>
                </TextBox>

                <StyledButton variant="contained" color="primary" sx={{ px: "30px", py: "6px" }}>
                  {item.buttonText}
                </StyledButton>
              </GridItemTwo>
            </StyledGrid>
          </Container>
        ))}
      </Carousel>
    </StyledBox>
  );
};

export default Section1;
