"use client";

import Banner from "models/Banner.model";
import Link from "next/link";
import MobileBannerCard from "./mobile-banner-card";
import ENVIRONMENT from "config/environment";
import { FlexBetween } from "components/flex-box";

type Props = { topBanners: Banner[] };
const MobileBannerSection = ({ topBanners }: Props) => {
  return (
    <FlexBetween
      mb={{ xs: 3, md: 0 }}
      sx={{ display: { xs: "flex", md: "none" } }}
      flexWrap="wrap"
    >
      {topBanners.map((banner) => (
        <Link key={banner.id} href={banner.link}>
          <MobileBannerCard
            imageFull
            flex={1}
            img={`${ENVIRONMENT.S3_BUCKET_URL}/${banner.imageUrl}`}
          />
        </Link>
      ))}
    </FlexBetween>
  );
};

export default MobileBannerSection;
