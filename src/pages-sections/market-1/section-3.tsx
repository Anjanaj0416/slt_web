"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM ICON COMPONENT
import CategoryIcon from "icons/Category";
// GLOBAL CUSTOM COMPONENTS
import BazaarCard from "components/BazaarCard";
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
// LOCAL CUSTOM COMPONENT
import TopCategoriesCard from "./shared/top-categories-card";
// CUSTOM DATA MODEL
import Category from "models/Category.model";

// =====================================================
type Props = { categoryList: Category[] };
// =====================================================

const Section3: FC<Props> = ({ categoryList }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 650) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <SectionCreator seeMoreLink="#" title="Top Categories" icon={<CategoryIcon color="primary" />}>
      <Carousel totalSlides={5} visibleSlides={visibleSlides}>
        {categoryList.map((item) => (
          <Link href={`/products/search/${item.slug}`} key={item.id}>
            <BazaarCard elevation={0} sx={{ p: 2 }}>
              <TopCategoriesCard
                title={item.name}
                imgUrl={item.image}
                subtitle={item.description}
              />
            </BazaarCard>
          </Link>
        ))}
      </Carousel>
    </SectionCreator>
  );
};

export default Section3;
