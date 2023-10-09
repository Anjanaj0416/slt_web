"use client";

import { FC } from "react";
import Link from "next/link";
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
  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } },
  ];

  return (
    <SectionCreator
      seeMoreLink="#"
      title="Top Categories"
      icon={<CategoryIcon color="primary" />}
    >
      <Carousel slidesToShow={3} responsive={responsive}>
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
