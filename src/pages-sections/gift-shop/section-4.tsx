"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { H1 } from "components/Typography";
import { Carousel } from "components/carousel";
// LOCAL CUSTOM COMPONENT
import CategoryCard from "./category-card";
// GLOBAL CUSTOM HOOKS
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Category from "models/Category.model";
// COMMON CAROUSEL STYLES
import { CAROUSEL_STYLE } from "./styles";

// ===============================================
type Props = { categoryList: Partial<Category>[] };
// ===============================================

const Section4: FC<Props> = ({ categoryList }) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <div>
      <H1 my={2}>Top Categories</H1>
      <Carousel
        infinite={true}
        sx={CAROUSEL_STYLE(theme)}
        visibleSlides={visibleSlides}
        totalSlides={categoryList.length}
      >
        {categoryList.map((item, ind) => (
          <Link href="/" key={ind}>
            <CategoryCard title={item.name} available={item.description} imgUrl={item.image} />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Section4;
