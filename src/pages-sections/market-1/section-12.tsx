"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
// CUSTOM ICON COMPONENT
import GiftBox from "icons/GiftBox";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import { H6 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import BazaarCard from "components/BazaarCard";
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";

// ========================================================
type Props = { bigDiscountList: Product[] };
// ========================================================

const Section12: FC<Props> = ({ bigDiscountList }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(6);

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);

  return (
    <SectionCreator icon={<GiftBox />} title="Big Discounts" seeMoreLink="#">
      <Box my="-0.25rem">
        <Carousel totalSlides={9} visibleSlides={visibleSlides}>
          {bigDiscountList.map(({ id, title, thumbnail, price, discount, slug }) => (
            <Box py={0.5} key={id}>
              <BazaarCard sx={{ p: "1rem" }}>
                <Link href={`/products/${slug}`}>
                  <HoverBox borderRadius={2} mb={1}>
                    <LazyImage width={500} height={500} alt={title} src={thumbnail} />
                  </HoverBox>

                  <H6 mb={0.5}>{title}</H6>

                  <FlexBox gap={1}>
                    <H6 color="primary.main">{calculateDiscount(price, discount)}</H6>
                    <Box component="del" fontWeight={600} color="grey.600">
                      {currency(price)}
                    </Box>
                  </FlexBox>
                </Link>
              </BazaarCard>
            </Box>
          ))}
        </Carousel>
      </Box>
    </SectionCreator>
  );
};

export default Section12;
